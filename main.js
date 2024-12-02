/**
 * Main script for pinout
 * This file contains code to perform when the page loads
 */

let devices = {
    "cm4": {
        "name": "Raspberry Pi Compute Module 4",
        "description": `
            The Raspberry Pi CM4 is an even more embeddable version of the venerable Raspberry Pi 4.  It features the same hardware as the Pi 4, except
            the CM4 breaks <em>every</em> signal to one of two 100-pin mezzanine connectors, giving you direct access to every signal!
            <br><br>
            Sources used:
            <ul>
                <li><a href="https://datasheets.raspberrypi.com/cm4/cm4-datasheet.pdf">CM4 Datasheet</a></li>
                <li><a href="https://elinux.org/RPi_BCM2711_GPIOs">eLinux.org BCM2711 GPIO Reference</a></li>
            </ul>`,
        "url": "pinouts/cm4.json",
        "img": "images/cm4_front.png"
    },
    "cm5": {
        "name": "Raspberry Pi Compute Module 5",
        "description": `
            Following on from the Compute Module 4, the CM5 takes the improved hardware of the Raspberry Pi 5 and squeezes it into the same
            200-pin form factor.  It's (mostly) pin-compatible with the CM4 but make sure to check the datasheet (or this pinout!) for changes.
            <br><br>
            The main changes are:
            <ul>
                <li>Upgrade to the BCM2712 SoC</li>
                <li>The 2xDSI and 2xCSI ports have been replaced with two dual-purpose MIPI interfaces (that can either be used as a camera <em>or</em> display)</li>
                <li>In the leftover space where a DSI and CSI were in the CM4, the CM5 provides two hardware USB3.0 interfaces</li>
                <li>ESD protection on certain interfaces has been removed</li>
                <li>The composite video output has been removed :(</li>
            </ul>
            Sources used:
            <ul>
                <li><a href="https://datasheets.raspberrypi.com/cm5/cm5-datasheet.pdf">CM5 Datasheet</a></li>
                <li><a href="https://datasheets.raspberrypi.com/rp1/rp1-peripherals.pdf">RP1 Peripherals Documentation</a></li>
                <li><a href="https://github.com/Felipegalind0/RPI5.pinout">Felipegalind0's RPi 5 Pinout</a></li>
            </ul>`,
        "url": "pinouts/cm5.json",
        "img": "images/cm5_front.png"
    }
}

window.onload = () => {

    // get handles to stuff
    let loading_container = document.getElementById("loading-container");
    let welcome_container = document.getElementById("welcome-container");
    let error_container = document.getElementById("error-container");
    let table_container = document.getElementById("table-container");
    let device_list = document.getElementById("device-list");
    let sidebar_tools = document.getElementById("sidebar-tools");
    let sidebar_description = document.getElementById("sidebar-description");
    let sidebar_desc = document.getElementById("sidebar-desc");
    let sidebar_device_image = document.getElementById("sidebar-device-image");
    let sidebar_device_name = document.getElementById("sidebar-device-name");
    let error_info = document.getElementById("error-info");
    let error_code = document.getElementById("error-code");
    let error_msg = document.getElementById("error-msg");

    // get device from url
    let params = new URLSearchParams(document.location.search);
    let device = params.get("device");
    console.log("loading device", device)

    if (device == null) 
    {
        loading_container.style.display = "none";
        welcome_container.style.display = "block";

        // make list of supported devices
        for (let [dev_id, dev] of Object.entries(devices)) {
            let div = document.createElement("div");
            div.classList.add("welcome-device", "card");

            let img = document.createElement("img");
            img.src = dev.img;
            img.classList.add("welcome-device-img")

            let name = document.createElement("h5");
            name.innerText = dev.name;
            name.classList.add("welcome-device-name", "card-title");
            
            let a = document.createElement("a");
            a.href = "/?device=" + dev_id;
            a.classList.add("stretched-link");

            div.append(img);
            div.append(name);
            div.append(a);
            device_list.append(div);

            // on hover
            div.addEventListener("mouseenter", event => {

                // set sidebar title and description
                sidebar_device_name.innerHTML = dev.name;
                sidebar_desc.innerHTML = dev.description;
                sidebar_device_image.src = dev.img;
                sidebar_description.style.display = "block";

            });
        };
    }
    else
    {
        // get device from list of devices
        if (!(device in devices)) {

            console.error("Invalid device name");
            error_info.innerText = "Device with ID \"" + device + "\" does not exist";
            error_code.style.display = "none";

            loading_container.style.display = "none";
            error_container.style.display = "block";

        } else {

            // get device info
            let dev = devices[device];
            fetch(dev.url).then(res => {

                if (!res.ok) {
                    throw new Error(`Got status code ${res.status} (${res.statusText}) fetching device manifest at ${dev.url}`, {cause: res});
                }
                else return res.json()

            }).then(device_info => {

                // store device info in window so pinout code can access it
                console.log("got device info:", device_info);
                window.pinout = device_info;

                // populate tables on page load
                generatePinTable();
                populatePinHeaderTables();
                populateFunctionTable();
                setupSearch();

                // update page title
                document.title = "Pinout - " + dev.name;

                // set sidebar title and description
                sidebar_device_name.innerHTML = dev.name;
                sidebar_desc.innerHTML = dev.description;
                sidebar_device_image.src = dev.img;

                // show table
                loading_container.style.display = "none";
                table_container.style.display = "flex";
                sidebar_description.style.display = "block";
                sidebar_tools.style.display = "block";

            }).catch(err => {

                console.error("Error getting device info:", err);
                error_info.innerText = "Sorry!  There was a problem loading the pinout for the " + dev.name + ":";
                error_msg.innerText = err;

                loading_container.style.display = "none";
                error_container.style.display = "block";

            })


        }
    }

}