#!/bin/bash

emoji=$(cat ~/.custom_scripts/emojis | rofi -i -dmenu -no-custom -p "emojis")
echo $emoji | cut -d' ' -f1 | xclip -selection clipboard
