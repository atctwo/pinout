# Pinout Thingy - Pinout Schema
This document describes the format of the json files used to define pinouts.  The entirety of a device is defined in one file, so it can get pretty long.

Device metadata like name and description are defined in [`main.js`](../main.js), so if you're adding a new device make sure to add it to here as well!

# Overview
Devices define a series of pins, each with a name and description.  Each pin is assigned a "class" which describes what its main function is (in other words, what hardware peripheral the pin is used for).  This determines the colour scheme used in the pin table.  Pins can have additional ("alternate") functions, each with their own secondary classes.  Each function class can also specify a controller ID in the case that there are multiple instances of a hardware peripheral (eg: I2C0, I2C1, etc).

When a pin is clicked on, the sidebar will show the pin's description.  It the pin has a detailed description, that will be shown instead.  If the pin has any alternate functions, they will be shown in a little table.

On the sidebar lives the Function Filter table.  This table contains cells for each function / peripheral.  One pin class corresponds to one function cell.  When a cell is clicked, all the pins that _don't_ belong to that class get dimmed, leaving the remaining pins more visible.  If multiple controllers are defined for a function, then a secondary "controller filter" table appears, allowing the user to filter to pins used by a specific controller for that function.

Pin classes are just strings, and are specific to each device manifest.  They are used directly for HTML / CSS class names so be sure not to use anything that wouldn't be allowed there.

# Pin Table
## Table Dimensions
The main pin table shown on-screen is a big table split into a predefined number of rows and columns.  Each pin specifies which cell it is to be placed in.  The dimensions of the table is defined using the root-level keys `pin_rows` and `pin_cols`.

## Pin Objects
Pins are defined as objects in the root `pins` array.  Each pin's main function is determined by "name" and "class", but additional alternate functions can be defined in the "functions" property.

The format for pin objects is:

- `name`: the name that is displayed on the pinout diagram
- `description`: a short description of the pin, shown when the pin is clicked on or hovered over
- `detailed_description`: (optional) a longer (optionally HTML based) string with a more detailed description of the pin
- `row`: the 0-indexed row to place the pin
- `col`: the 0-indexed column to place the pin
- `dir`: the conceptual direction of the pin relative to the centre of the device (should be one of `n`, `s`, `e`, `w`)
- `class`: an overall idea of what type of pin it is, or what peripheral it belongs to.  determines the main function used for colour coding
- `controller_id`: (optional) the id of the peripheral controller this pin belongs to
- `functions`: (optional) an array of alt function objects that determine alternate functions for each pin
- `other_classes`: (optional) an array of strings to also set as classes for the pin (ie: for alternate functions)
    
### `functions` Object Format
- `name`: the name of the pin / signal
- `description`: a description of the pin / signal
- `class`: an overall idea of what type of pin it is, or what peripheral it belongs to.  determines the alternate function used for colour coding
- `controller_id`: (optional) the id of the peripheral controller this pin belongs to



# Function Table
## Table Dimensions
Like the pin table, the function table is also a table of predefined dimensions (defined by the root-level objects `function_name_row` (with no `s`) and `function_row_columns`).  Function table entries specify which cell they should be placed in.

## Function Table Objects
Function table entries are specified as objects in the root-level `function_names`  key.  The format of these objects is as such:

- `name`: the name to show on the filter table
- `description`: a short string to describe the function
- `detailed_description`: (optional) a longer string with a more detailed description of the function
- `class`: pins of this class (`pin-function-<class>`) will be highlighted.  if this is missing, name.toLower() will be used as the class
- `controllers`: (optional) an array of controller objects that represent each individual controller for that peripheral
    
### `controllers` Object Format
- `name`: the name to show on the controller filter table
- `id`: (optional) the id to use to identify which pins are connected to this controller.  if not present, name.toLowerCase() is used
- `other_classes`: (optional) an array of strings to also set as classes for the controller filter table entry (ie: for alternate functions)

