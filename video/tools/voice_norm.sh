#!/bin/sh
# DATOLOGO · tools/voice_norm.sh — normaliza la narración a -16 LUFS (pico -1.5 dB) antes de armar el ZIP (uso de Claude)
# Uso: sh tools/voice_norm.sh voice_original.mp3 voice.mp3
ffmpeg -v error -y -i "$1" -af "loudnorm=I=-16:TP=-1.5:LRA=11" -ar 44100 -b:a 192k "$2"
