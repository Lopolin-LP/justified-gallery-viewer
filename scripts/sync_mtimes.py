#!/usr/bin/env python3
"""
sync_mtimes.py

---
FULLY GENERATED WITH CLAUDE SONNET 5

Because I couldn't be bothered to write this myself.
It's one job to get done and I am not wasting three hours of my life on this.

Goal: Transfer old modified times to new collection.
This was made after a logic mistake in my code essentially wiped all modified times from newly imported collections.
To use it you must unzip both a known good collection and the newest broken you have.
---

You have two directories:
  1. SOURCE_DIR - files with correct "last modified" dates.
  2. TARGET_DIR - the same files (identical content), but renamed and with
     their modified date reset to Jan 1 1970.

This script matches files between the two directories by CONTENT (SHA-256
hash), not by name, and:
  - For each TARGET_DIR file whose content matches a SOURCE_DIR file,
    copies that source file's modified (and access) time onto it.
  - For each TARGET_DIR file with no matching content in SOURCE_DIR,
    sets its modified time to the current date/time.

Only top-level files are considered in both directories (no subfolders),
matching the setup described.

Usage:
    python3 sync_mtimes.py /path/to/dir1 /path/to/dir2 [--dry-run]

Options:
    --dry-run   Show what would happen without changing any files.
    --hash      Hash algorithm to use for matching (default: sha256).
"""

import argparse
import hashlib
import os
import sys
import time
from datetime import datetime


def hash_file(path: str, algo: str = "sha256", chunk_size: int = 1024 * 1024) -> str:
    h = hashlib.new(algo)
    with open(path, "rb") as f:
        while True:
            chunk = f.read(chunk_size)
            if not chunk:
                break
            h.update(chunk)
    return h.hexdigest()


def list_files(directory: str):
    """Return list of top-level file paths in `directory` (no subfolders)."""
    entries = []
    for name in os.listdir(directory):
        full = os.path.join(directory, name)
        if os.path.isfile(full):
            entries.append(full)
    return entries


def fmt_time(ts: float) -> str:
    return datetime.fromtimestamp(ts).strftime("%Y-%m-%d %H:%M:%S")


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("source_dir", help="Directory with correct last-modified dates")
    parser.add_argument("target_dir", help="Directory to fix (renamed files, dates reset to 1970)")
    parser.add_argument("--dry-run", action="store_true", help="Don't actually change anything, just print the plan")
    parser.add_argument("--hash", default="sha256", help="Hash algorithm to use (default: sha256)")
    args = parser.parse_args()

    source_dir = args.source_dir
    target_dir = args.target_dir

    if not os.path.isdir(source_dir):
        sys.exit(f"Error: source directory not found: {source_dir}")
    if not os.path.isdir(target_dir):
        sys.exit(f"Error: target directory not found: {target_dir}")

    print(f"Scanning source directory: {source_dir}")
    source_files = list_files(source_dir)
    print(f"  Found {len(source_files)} files")

    print(f"Scanning target directory: {target_dir}")
    target_files = list_files(target_dir)
    print(f"  Found {len(target_files)} files")

    # Build hash -> mtime map from source directory.
    print(f"\nHashing source files ({args.hash})...")
    source_hash_to_mtime = {}
    duplicate_hashes = set()
    for path in source_files:
        digest = hash_file(path, args.hash)
        mtime = os.path.getmtime(path)
        if digest in source_hash_to_mtime:
            duplicate_hashes.add(digest)
            # Keep the earliest mtime among duplicates (arbitrary but deterministic choice).
            source_hash_to_mtime[digest] = min(source_hash_to_mtime[digest], mtime)
        else:
            source_hash_to_mtime[digest] = mtime

    if duplicate_hashes:
        print(f"  Note: {len(duplicate_hashes)} source files share content with another "
              f"source file (duplicate content); using the earliest date among duplicates.")

    now = time.time()
    matched_count = 0
    unmatched_count = 0

    print(f"\nHashing target files and applying dates...")
    for path in target_files:
        digest = hash_file(path, args.hash)
        name = os.path.basename(path)
        if digest in source_hash_to_mtime:
            new_mtime = source_hash_to_mtime[digest]
            matched_count += 1
            print(f"  MATCH   {name}  ->  {fmt_time(new_mtime)}")
        else:
            new_mtime = now
            unmatched_count += 1
            print(f"  NO MATCH {name}  ->  now ({fmt_time(new_mtime)})")

        if not args.dry_run:
            os.utime(path, (new_mtime, new_mtime))  # sets (atime, mtime)

    print(f"\nDone. {matched_count} file(s) matched and dated from source, "
          f"{unmatched_count} file(s) set to current time.")
    if args.dry_run:
        print("(dry run - no files were actually modified)")


if __name__ == "__main__":
    main()
