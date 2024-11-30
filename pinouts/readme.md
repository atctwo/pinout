pin description format
{
    "name": the name that is displayed on the pinout diagram
    "description": a short description of the pin, shown when the pin is clicked on or hovered over
    "detailed_description": (optional) a longer (optionally HTML based) string with a more detailed description of the pin
    "row": the 0-indexed row to place the pin
    "col": the 0-indexed column to place the pin
    "dir": the conceptual direction of the pin relative to the centre of the device (should be one of "n", "s", "e", "w")
    "class": an overall idea of what type of pin it is, or what peripheral it belongs to.  determines the Regular function used for colour coding
    "controller_id": (optional) the id of the peripheral controller this pin belongs to
    "functions": (optional) an array of strings that determine alternate functions for each pin
    "other_classes": (optional) an array of strings to also set as classes for the pin (ie: for alternate functions)
    
    Regular function is determined by "name" and "class", but additional alternate functions can be defined in the
    "functions" property
    
    other classes format
    {
        "name": the name of the pin / signal
        "description": a description of the pin / signal
        "class": an overall idea of what type of pin it is, or what peripheral it belongs to.  determines the Regular function used for colour coding
        "controller_id": (optional) the id of the peripheral controller this pin belongs to
    }
}

function_name_columns defines the number of columns the filter table will have.  you can add "blank" functions
to group similar functions together.

function names filter table format
{
    "name": the name to show on the filter table
    "description": a short string to describe the function
    "detailed_description": (optional) a longer (optionally HTML based) string with a more detailed description of the function
    "class": pins of this class (pin-function-<class>) will be highlighted.  if this is missing, name.toLower() will be used
    "controllers": (optional) an array of controller objects that represent each individual controller for that peripheral
    
    controller object format
    {
        "name": the name to show on the controller filter table
        "id": (optional) the id to use to identify which pins are connected to this controller.  if not present, name.toLowerCase() is used
        "other_classes": (optional) an array of strings to also set as classes for the controller filter table entry (ie: for alternate functions)
    }
}