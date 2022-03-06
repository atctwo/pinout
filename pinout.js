
/**
 * Populate the 2 pin headers with pins
 */
function populatePinHeaderTables()
{
    // for each header
    pinout.headers.forEach((header, header_num) => {
        
        // get header table
        var header_table = document.getElementById(header.table_id);
        
        // add pins
        for (var pin_num = 0; pin_num < header.pins.length; pin_num += 2)
        {
            // get pin
            var pin_left  = header.pins[pin_num + 1];
            var pin_right = header.pins[pin_num];
            
            var pin_left_number  = pin_num + 2 + (header_num * 100);
            var pin_right_number = pin_num + 1 + (header_num * 100);
            
            // add table row
            var pin_row = header_table.insertRow(0);
            
            
            // add left pin name
            var pin_left_name = pin_row.insertCell(0);
            pin_left_name.classList.add("pin-name")
            if ("other_classes" in pin_left) pin_left.other_classes.forEach(c => {
                pin_left_name.classList.add(c)
            })
            pin_left_name.id = "pin-" + pin_left_number;
            showPinFunction(pin_left_number, null);
            
            pin_left_name.onclick = function(pin_num) {
                return function() {
                    var pin  = header.pins[pin_num];
                    showPinInfo(pin.name, pin.description, pin.detailed_description, pin.functions)
                }
            }(pin_num + 1)
            
            // add left pin number
            var pin_left_num = pin_row.insertCell(1);
            pin_left_num.innerText = pin_left_number;
            pin_left_num.classList.add("pin-number")
            
            
            // add right pin number
            var pin_right_num = pin_row.insertCell(2);
            pin_right_num.innerText = pin_right_number;
            pin_right_num.classList.add("pin-number")
            
            // add right pin name
            var pin_right_name = pin_row.insertCell(3);
            pin_right_name.classList.add("pin-name")
            if ("other_classes" in pin_right) pin_right.other_classes.forEach(c => {
                pin_right_name.classList.add(c)
            })
            pin_right_name.id = "pin-" + pin_right_number;
            showPinFunction(pin_right_number, null);
            
            pin_right_name.onclick = function(pin_num) {
                return function() {
                    var pin  = header.pins[pin_num];
                    showPinInfo(pin.name, pin.description, pin.detailed_description, pin.functions)
                }
            }(pin_num)
        }
        
    })
}

/**
 * Populate the function filter table with function names
 */
function populateFunctionTable()
{
    // get function table
    var func_table = document.getElementById("function-filter");
    
    // add functions
    for (var i = 0; i < function_names.length; i += function_name_columns) {
        
        // add row
        var function_row = func_table.insertRow(-1);
        
        for (var j = 0; j < function_name_columns; j++)
        {
        
            var function_name = function_names[i + j]
            
            // add cell
            var function_cell = function_row.insertCell(-1);
            
            // cell text and tooltip
            function_cell.innerText = function_name.name;
            function_cell.title = function_name.description;
            
            // cell class
            var function_class = "";
            if ("class" in function_name) function_class = function_name.class;
            else function_class = function_name.name.toLowerCase();
            
            function_cell.classList.add("pin-class-" + function_class)
            
            if ("other_classes" in function_name) function_name.other_classes.forEach(c => {
                cell.classList.add(c)
            })
            
            // cell onclick
            function_cell.onclick = function (function_name, function_class) {
                return function() {
                    
                    // show pins of that function
                    showPinsOfFunction(function_class);
                    
                    // show function info in pin info box
                    showPinInfo(function_name.name, function_name.description, function_name.detailed_description);
                    
                    // show controller table (if present)
                    var controller_table = document.getElementById("controller-filter");
                    var controller_table_container = document.getElementById("controller-filter-container");
                    if ("controllers" in function_name)
                    {
                        // remove existing controller entries
                        while (controller_table.rows.length > 1) controller_table.deleteRow(-1);
                        
                        // add new controller entries
                        var row = controller_table.insertRow(-1);
                        function_name.controllers.forEach(controller => {
                            
                            // make new cell
                            var cell = row.insertCell(-1);
                            cell.innerText = controller.name;
                            
                            // determine controller id
                            var id = "";
                            if ("id" in controller) id = controller.id;
                            else                    id = controller.name.toLowerCase();
                            cell.classList.add("pin-class-" + function_class);
                            
                            if ("other_classes" in controller) controller.other_classes.forEach(c => {
                                cell.classList.add(c)
                            })
                            
                            // cell onclick
                            cell.onclick = function(func, id) {
                                return function() {
                                    showPinsOfFunction(func, id);
                                }
                            }(function_class, id)
                            
                        })
                        
                        // show table
                        controller_table_container.style.display = "block";
                        document.getElementById("controller-filter-title").colSpan = function_name.controllers.length;
                        
                    }
                    else controller_table_container.style.display = "none";
                    
                }
            }(function_name, function_class)
            
        }
        
    }
    
    // set title colspan
    document.getElementById("function-filter-title").colSpan = function_name_columns;
}

/**
 * Highlights each pin that supports a given function
 * @param {string} function_name the function to show pins for
 * @param {string} controller_id the id of the specific controller to show the pins for (null shows all pins of that function)
 */
function showPinsOfFunction(function_name, controller_id=null)
{
    for (var i = 1; i <= 200; i++)
    {
        showPinFunction(i, function_name, controller_id);
    }
}

/**
 * Show a pin in the context of a certain function (if it supports it, including as an alternate function)
 * @param {number} pin_id the number of the pin to show
 * @param {string} function_name the name of the function to show
 * @param {string} controller_id the id of the specific controller to show the pins for (null shows all pins of that function)
 */
function showPinFunction(pin_id, function_name, controller_id=null)
{
    console.debug(`showPinFunction, pin ${pin_id}, function name: ${function_name}, controller id: ${controller_id}`)
    
    // get pin element
    var pin_element = document.getElementById(`pin-${pin_id.toString()}`);
    
    // get pin position
    var header_num = Math.floor((pin_id-1)/100);
    var pin_num = (pin_id-1) % 100;
    console.debug(`header ${header_num}, pin ${pin_num}`)
    
    // get pin description
    var pin_description = pinout.headers[header_num].pins[pin_num];
    console.debug("pin description:", pin_description)
    
    if (pin_element)
    {        
        // remove hide class
        pin_element.classList.remove("pin-class-hide");
        
        // if function name is null, set the pin to the regular function
        if (!function_name)
        {
            // remove any existing pin classes
            function_names.forEach(func => {
                var func_class = "";
                if ("class" in func) func_class = func.class;
                else func_class = func.name.toLowerCase();
                pin_element.classList.remove("pin-class-" + func_class)
            });
            
            pin_element.innerText = pin_description.name;
            pin_element.title = pin_description.description;
            pin_element.classList.add("pin-class-" + pin_description.class)
        }
        // otherwise, show pins of the specified function
        else
        {
            // clear existing pin info
            // pin_element.innerText = "";
            // pin_element.title = "";
            
            // function_names.forEach(func => {
            //     pin_element.classList.remove("pin-class-" + func.class)
            // });
            
            // flag to check if a function has already been found
            var found_matching_function = false;
            
            // check the regular function
            if (pin_description.class == function_name)
            {
                // if controller id is specified, filter by it
                if (controller_id != null)
                {
                    if (controller_id != pin_description.controller_id)
                    {
                        console.debug(`pin ${pin_id} doesn't match the controller id`)
                        pin_element.classList.add("pin-class-hide")
                        return
                    }
                }
                
                // remove any existing pin classes
                function_names.forEach(func => {
                    var func_class = "";
                    if ("class" in func) func_class = func.class;
                    else func_class = func.name.toLowerCase();
                    pin_element.classList.remove("pin-class-" + func_class)
                });
                
                pin_element.innerText = pin_description.name;
                pin_element.title = pin_description.description;
                pin_element.classList.add("pin-class-" + pin_description.class)
                found_matching_function = true;
            }
            
            // check alt functions
            var alt_functions = pin_description.functions;
            
            // if the pin has alt functions
            if (alt_functions)
            {
                // flag to check if matching alt function exists
                var found_matching_alt_function = false;
                
                // for each alt function
                alt_functions.forEach((alt_function, alt_function_id) => {
                    
                    // if the alt function matches the function name
                    if (alt_function.class == function_name)
                    {
                        // controller id is matched (or if controller id isn't specified)
                        if ( (controller_id != null && controller_id == alt_function.controller_id) || controller_id == null )
                        {
                        
                            // if there's already an alt function listed, add a comma
                            if (found_matching_function) pin_element.innerText += ", ";
                            else {
                                // remove any existing pin classes
                                function_names.forEach(func => {
                                    var func_class = "";
                                    if ("class" in func) func_class = func.class;
                                    else func_class = func.name.toLowerCase();
                                    pin_element.classList.remove("pin-class-" + func_class)
                                });
                                pin_element.innerText = "";
                            }
                            
                            pin_element.innerText += alt_function.name;
                            pin_element.title = alt_function.description;
                            pin_element.classList.add("pin-class-" + alt_function.class)
                            
                            found_matching_function = true;
                            found_matching_alt_function = true;
                        
                        }
                        else
                        {
                            console.debug(`pin ${pin_id} doesn't match the controller id`)
                            //pin_element.classList.add("pin-class-hide")
                        }
                    }
                    
                })
            }
            
            // if the pin doesn't have alt functions, show the regular function
            else
            {
                console.debug(`pin ${pin_id} has no alternate functions`)
            }
            
            // if a matching function wasn't found
            if (!found_matching_function)
            {
                console.debug(`pin ${pin_id} has no matching alt function`)
                pin_element.classList.add("pin-class-hide")
            }
        }
    }
    else
    {
        console.debug(`Pin ${pin_id} does not exist`);
    }
}

function showPinInfo(pin_name, pin_description, pin_detailed_description, functions=null)
{
    document.getElementById("selected-pin-name").innerText = pin_name;
    if (pin_detailed_description) document.getElementById("selected-pin-description").innerHTML = pin_detailed_description;
    else if (pin_description) document.getElementById("selected-pin-description").innerText = pin_description;
    else document.getElementById("selected-pin-description").innerText = "";

    // show alternate functions if present
    var alt_func_container = document.getElementById("alt-function-container");
    var alt_func_table = document.getElementById("alt-function-table");
    if (functions)
    {
        // show container
        alt_func_container.style.display = "block";

        // clear rows
        while(alt_func_table.rows.length > 1) alt_func_table.deleteRow(-1);

        // add rows
        functions.forEach((func, func_id) => {

            // add row
            var func_row = alt_func_table.insertRow(-1);
            func_row.classList.add("pin-class-" + func.class);

            // id cell
            var id_cell = func_row.insertCell(-1);
            id_cell.innerText = func_id;

            // signal name cel
            var name_cell = func_row.insertCell(-1);
            name_cell.innerText = func.name;

            // description cell
            var desc_cell = func_row.insertCell(-1);
            desc_cell.innerText = func.description;

        })
    }
    else alt_func_container.style.display = "none";
}

function searchForSignal(fuse, pattern)
{
    var results = fuse.search(pattern);
    var matches = [];

    console.log(results)

    // store each match
    results.forEach((header, header_id) => {

        console.log(header_id)

        // get the header table element
        var header_table = document.getElementById(header.item.table_id);

        // store the pin number of each match
        header.matches.forEach(match => {

            var pin_id = match.refIndex + 1 + (100 * header.refIndex);
            console.log(`pin id ${pin_id}`)
            console.log(match)
            matches.push(pin_id)

        })
    });

    console.log(matches)

    // highlight stored matches
    for (var i = 1; i <= 200; i++)
    {
        // get pin element
        var pin_element = document.getElementById(`pin-${i}`);

        // remove hide class
        pin_element.classList.remove("pin-class-hide");

        // if pin id isn't in matches
        if (!matches.includes(i))
        {
            // set pin transparency
            pin_element.classList.add("pin-class-hide");
        }
    }
}

function signalSearch()
{
    // get search query
    var query = document.getElementById("signal-search").value;
    console.log(`searching for ${query}`);

    // perform search
    searchForSignal(pin_fuse, query);
}

function toggleSidebar()
{
    var sidebar = document.getElementById("sidebar");

    if (sidebar.style.display != "none") sidebar.style.display = "none";
    else sidebar.style.display = "block";
}


// setup Fuse.js fuzzy searching
const options = {
    // isCaseSensitive: false,
    // includeScore: false,
    // shouldSort: true,
    includeMatches: true,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    threshold: 0.3,
    // distance: 100,
    useExtendedSearch: true,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    keys: [
      "pins.name",
      "pins.description",
      "pins.functions.name",
      "pins.functions.description"
    ]
  };
var pin_fuse = new Fuse(pinout.headers, options)


// populate tables on page load
populatePinHeaderTables();
populateFunctionTable();