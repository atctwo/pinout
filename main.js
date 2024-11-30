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
        "url": "pinouts/cm4.json"
    }
}

window.onload = () => {

    // get handles to stuff
    let loading_container = document.getElementById("loading-container");
    let welcome_container = document.getElementById("welcome-container");
    let table_container = document.getElementById("table-container");
    let device_list = document.getElementById("device-list");
    let sidebar_tools = document.getElementById("sidebar-tools");
    let sidebar_description = document.getElementById("sidebar-description");
    let sidebar_desc = document.getElementById("sidebar-desc");
    let sidebar_device_name = document.getElementById("sidebar-device-name");

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
            let li = document.createElement("li");
            let a = document.createElement("a");
            a.innerText = dev.name;
            a.href = "/?device=" + dev_id;
            li.append(a);
            device_list.append(li);
        };
    }
    else
    {
        // get device from list of devices
        if (!(device in devices)) {
            console.error("Invalid device name");
        } else {

            // get device info
            let dev = devices[device];
            fetch(dev.url).then(res => {
                return res.json()
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

                // show table
                loading_container.style.display = "none";
                table_container.style.display = "flex";
                sidebar_description.style.display = "block";
                sidebar_tools.style.display = "block";

            }).catch(err => {

                console.error("Error getting device info:", err);

            })


        }
    }

}