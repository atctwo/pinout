
// function to apply a bootstrap colour mode based on localstorage contents
function apply_colour_mode()
{
    let colour_mode = localStorage.getItem("colourmode");
    let html = document.querySelector("html");

    // if colour mode is set in localstorage to dark or light, set colour mode to that
    if      (colour_mode == "dark")  html.dataset.bsTheme = "dark";
    else if (colour_mode == "light") html.dataset.bsTheme = "light";

    // if colour mode is set to auto or unspecified, set to browser default
    else 
    {
        // get browser preference
        if (window.matchMedia) {

            if (window.matchMedia('(prefers-color-scheme: dark)').matches) html.dataset.bsTheme = "dark";
            else html.dataset.bsTheme = "light";

        } else html.dataset.bsTheme = "light";
    }

    // update colour selection button
    update_colour_select_btn();

    // call callback on document
    const colour_event = new CustomEvent("colour_update", {
        detail: html.dataset.bsTheme
    });
    document.dispatchEvent(colour_event);
}

// automatically set the colour mode when the browser's colour preference changes
// based on https://stackoverflow.com/a/57795495
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {

    let colour_mode = localStorage.getItem("colourmode");
    let html = document.querySelector("html");

    // if colour mode isn't specified by user
    if (colour_mode != "light" && colour_mode != "dark")
    {
        if (event.matches == "dark") html.dataset.bsTheme = "dark";
        else                         html.dataset.bsTheme = "light";
    }

});

// function to set a colour mode and store it in localstorage
function set_colour_mode(mode)
{
    // store mode in localstorage
    if (mode == "light" || mode == "dark")
    {
        localStorage.setItem("colourmode", mode);
    }
    else
    {
        localStorage.setItem("colourmode", "auto");
    }

    apply_colour_mode()
}

// function to update the icon on the colour selector button
function update_colour_select_btn()
{
    // update colour selector icon based on localstorage
    let btn = document.getElementById("header-color-select-btn");
    let colour_mode = localStorage.getItem("colourmode");

    if (btn)
    {
        if (colour_mode == "dark") btn.innerHTML = `<i class="bi bi-moon-stars-fill"></i>`;
        else if (colour_mode == "light") btn.innerHTML = `<i class="bi bi-brightness-high-fill"></i>`;
        else btn.innerHTML = `<i class="bi bi-brightness-alt-high-fill"></i>`;
    }
}

apply_colour_mode();

/*


function apply_colour_mode()
    // if colour mode is set in localstorage to dark or light, set colour mode to that
    // if colour mode is set to auto or unspecified, set to browser default

function set_colour_mode(mode)
    // store mode in localstorage
    // apply_colour_mode()

// on page load
    apply_colour_mode()

*/