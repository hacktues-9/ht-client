# convert all images to webp

import os
import sys
import glob
import subprocess

def main():
    for filename in glob.glob("*.jpg"):
        subprocess.run(["cwebp", "-q", "80", filename, "-o", filename[:-4] + ".webp"])

if __name__ == "__main__":
    main()