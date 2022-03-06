# Raspberry Pi Compute Module 4 Interactive Pinout

This is an interactive pinout website for the [Raspberry Pi Computer Module 4](https://www.raspberrypi.com/products/compute-module-4/?variant=raspberry-pi-cm4001000).  It's a version of the Raspberry Pi designed to be used in embedded applications.

Unlike the classic Pi's 40 pin (2x20) expansion header, the CM4 has two 100 pin high density connectors on the underside of the module.  The headers include the pins from the 40 pin header, signals for the connectors found on the Pi (like USB, HDMI, Ethernet, etc), and more pins not normally accessible from the classic Pi form factor.

The 40 pin header has existing resources that explain what each pin does.  One I really like is [pinout.xyz](https://pinout.xyz).  But I haven't found any similar graphical representations for the CM4's combined 200 pins.  This website aims to provide a graphical layout of each pin of the CM4.

A live version of the webpage can be found at [atctwo.co.uk/projects/pinout](https://atctwo.co.uk/projects/pinout).  If you spot any errors with the pinout itself, please raise an issue, and I'll fix it as soon as possible!

![Screenshot of the website](screenshot.png)

# Usage

In the main section of the website, you can see two tables with two columns of pins.  The layout matches the pins when the CM4 is viewed top-down, with the WiFi cutout at the top (like an arrow pointing upwards).

You can click on a signal name to see a description of it on the pane at the left.  You will also see any alternate functions available on that pin.

On the pane at the left, you will see a legend that tells you what each pin colour means.  The colours are split into the various features and interfaces the CM4 provides. You can click on a function to highlight each pin that supports that function.  Some peripherals have several separate controllers, so you can also filter by controller, where available.

You may notice that some pins support two of the same function.  For example, GPIO19 acts as the MISO pin for both SPI6 and SPI1.

You can also use the search box to search for a specific signal.  It uses Fuse.js for fuzzy searching, so the query doesn't have to be exact, but that means the results aren't exact either.

# Project Contents
- `index.html` - the main HTML of the website
- `pinout.css` - the CSS for the website (this is where each of the colour codes are defined)
- `pinout.js` - the main JS that processes the pin definitions and dynamically populates the pin header and function tables
- `pins.js` - a JS file that contains a giant JSON object with descriptions of every pin on the CM4 (and another for the function table)

This website is part of atctwo.co.uk, and is included there as a git submodule so it's automatically built along with the main website.
