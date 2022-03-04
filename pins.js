/*
adapted from https://datasheets.raspberrypi.com/cm4/cm4-datasheet.pdf

pin description format
{
    "name": the name that is displayed on the pinout diagram
    "description": a short description of the pin, shown when the pin is clicked on or hovered over
    "detailed_description": (optional) a longer (optionally HTML based) string with a more detailed description of the pin
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

*/

function_name_columns = 2;
function_names = [
    {
        "name": "All Pins", 
        "description": "Show all pins", 
        "detailed_description": "",
        "class": null 
    },
    { // blank
        "name": "\u200b", 
        "description": "", 
        "detailed_description": "",
        "class": null 
    },
    
    {
        "name": "Power", 
        "description": "Power inputs and outputs",
        "detailed_description": "These are the CM4's power input and output pins: <ul> <li>6 x 5V input pins</li> <li>2 x 1.8V Output pins</li> <li>2 x 3.3V Output pins</li> <li>GPIO_VREF, which controls whether the GPIO pins operate at 3v3 or 1v8</li> </ul>",
        "controllers": [
            { "name": "5V Input", "id": "5v" },
            { "name": "3.3V Output", "id": "3v3" },
            { "name": "1.8V Output", "id": "1v8" },
            { "name": "GPIO VRef", "id": "gpio" },
        ]
    },
    {
        "name": "Ground", 
        "description": "Ground connections", 
        "detailed_description": "",
        "class": "gnd"
    },
    
    {
        "name": "System", 
        "description": "Raspberry Pi System pins", 
        "detailed_description": "These are pins for controlling and monitoring the Raspberry Pi system. <ul> <li>Wifi and Bluetooth disable pins</li> <li>Power and actvity output LEDs</li> <li>Reset and shutdown pins</li> <li>Many more</li> </ul>",
        "class": "rpi" 
    },
    {
        "name": "GPIO", 
        "description": "General Purpose Input / Output",
        "detailed_description": "Pins that can be used as digital inputs or outputs as needed.  See <a href='https://www.raspberrypi.com/documentation/computers/raspberry-pi.html#general-purpose-io-gpio'>the Raspberry Pi documentation</a>",
    },
    
    {
        "name": "GPCLK", 
        "description": "General Purpose Clock",
        "detailed_description": "Can be configured to output a fixed frequency on a pin.  There's not much documentation on this, but <a href='https://pinout.xyz/pinout/gpclk'>pinout.xyz</a> has an introduction",
        "controllers": [
            { "name": "0" },
            { "name": "1" },
            { "name": "2" }
        ]
    },
    { // blank
        "name": "\u200b", 
        "description": "", 
        "detailed_description": "",
        "class": null 
    },
    
    {
        "name": "I2C / BSC", 
        "description": "Inter-integrated Circuit / Broadcom Serial Controller",
        "detailed_description": "",
        "class": "i2c",
        "controllers": [
            { "name": "0", "other_classes": ["hat-i2c"] },
            { "name": "1" },
            // { "name": "2" },
            { "name": "3" },
            { "name": "4" },
            { "name": "5" },
            { "name": "6" }
        ]
    },
    {
        "name": "SPI", 
        "description": "Serial Peripheral Interface",
        "detailed_description": "SPI Controller.  The CM4 has 7 SPI controllers, details are on <a href='https://www.raspberrypi.com/documentation/computers/raspberry-pi.html#serial-peripheral-interface-spi'>the Raspberry Pi documentation</a>",
        "controllers": [
            { "name": "0" },
            { "name": "1" },
            // { "name": "2" },
            { "name": "3" },
            { "name": "4" },
            { "name": "5" },
            { "name": "6" },
        ]
    },
    
    {
        "name": "UART", 
        "description": "Universal Asynchronous Receiver Transmitter",
        "detailed_description": "",
        "controllers": [
            { "name": "0" },
            { "name": "1" },
            { "name": "2" },
            { "name": "3" },
            { "name": "4" },
            { "name": "5" },
        ]
    },
    {
        "name": "SDIO", 
        "description": "Secure Digital Input Output",
        "detailed_description": "Used to connect the CM4 Lite to an SD Card.  If not using a CM4 Lite, this is used for the onboard eMMC, and shouldn't be used.",
        "controllers": [
            { "name": "SD / eMMC", "id": "sd"},
            { "name": "0" },
            { "name": "1" }
        ]
    },
    
    
    {
        "name": "USB",
        "description": "Universal Serial Bus",
        "detailed_description": "Hardware USB controller.  Details are available on the <a href='https://www.raspberrypi.com/documentation/computers/raspberry-pi.html#universal-serial-bus-usb'>Raspberry Pi documentation</a>"
    },
    {
        "name": "Ethernet", 
        "description": "Gigabit Ethernet",
        "detailed_description": "",
    },
    
    {
        "name": "PCIe", 
        "description": "Peripheral Component Interconnect Express",
        "detailed_description": "",
    },
    { // blank
        "name": "\u200b", 
        "description": "", 
        "detailed_description": "",
        "class": null 
    },
    
    {
        "name": "PWM", 
        "description": "Pulse Width Modulation",
        "detailed_description": ""
    },
    {
        "name": "PCM", 
        "description": "Pulse Code Modulation",
        "detailed_description": "",
    },
    
    {
        "name": "SMI", 
        "description": "Secondary Memory Interface", 
        "detailed_description": "",
        "class": "smi" 
    },
    {
        "name": "JTAG", 
        "description": "Joint Test Action Group Interface",
        "detailed_description": "Protocol for external programming and debugging and testing",
    },
    
    {
        "name": "HDMI", 
        "description": "High Definition Multimedia Interface",
        "detailed_description": "",
        "controllers": [
            { "name": "0" },
            { "name": "1" }
        ]
    },
    {
        "name": "TV", 
        "description": "Analogue TV Video Output",
        "detailed_description": "Analogue TV Video Output, commonly used with RCA / Phono / Composite connectors.",
    },
    
    {
        "name": "DPI", 
        "description": "Display Parallel Interface",
        "detailed_description": "Parallel interface for controlling LCD displays.  See the <a href='https://www.raspberrypi.com/documentation/computers/raspberry-pi.html#parallel-display-interface-dpi'>Raspberry Pi documentation</a>",
    },
    {
        "name": "DSI", 
        "description": "Display Serial Interface",
        "detailed_description": "Serial interface for controlling LCD displays (like the <a href='https://www.raspberrypi.com/documentation/accessories/display.html'>official Touch display</a>).",
        "controllers": [
            { "name": "0" },
            { "name": "1" }
        ]
    },
    
    {
        "name": "CSI", 
        "description": "Camera Serial Interface",
        "detailed_description": "",
        "controllers": [
            { "name": "0" },
            { "name": "1" }
        ]
    },
    {
        "name": "Reserved", 
        "description": "Pins reserved for future use",
        "detailed_description": "",
    },
]

pinout = {
    "headers": [
        { // header 0
            "table_id": "pin-header-0",
            "pins": [
                { // pin 1
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 2
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 3
                    "name": "Ethernet_Pair3_P",
                    "description": "Ethernet Pair 3 Positive",
                    "class": "ethernet"
                },
                { // pin 4
                    "name": "Ethernet_Pair1_P",
                    "description": "Ethernet Pair 1 Positive",
                    "class": "ethernet"
                },
                { // pin 5
                    "name": "Ethernet_Pair3_N",
                    "description": "Ethernet Pair 3 Negative",
                    "class": "ethernet"
                },
                { // pin 6
                    "name": "Ethernet_Pair1_N",
                    "description": "Ethernet Pair 1 Negative",
                    "class": "ethernet"
                },
                { // pin 7
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 8
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 9
                    "name": "Ethernet_Pair2_N",
                    "description": "Ethernet Pair 2 Negative",
                    "class": "ethernet"
                },
                { // pin 10
                    "name": "Ethernet_Pair0_N",
                    "description": "Ethernet Pair 0 Negative",
                    "class": "ethernet"
                },
                { // pin 11
                    "name": "Ethernet_Pair2_P",
                    "description": "Ethernet Pair 2 Positive",
                    "class": "ethernet"
                },
                { // pin 12
                    "name": "Ethernet_Pair0_P",
                    "description": "Ethernet Pair 0 Positive",
                    "class": "ethernet"
                },
                { // pin 13
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 14
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 15
                    "name": "Ethernet_nLED3",
                    "description": "Low Active Ethernet Activity indicator ( 3.3V signal) Typically a Green LED is connected to this pin: IOL = 8mA @ VOL< 0.4V",
                    "class": "ethernet"
                },
                { // pin 16
                    "name": "Ethernet_SYNC_IN",
                    "description": "IEEE1588 SYNC Input pin ( 1.8V signal : IOL = 8mA @ VOL< 0.4V )",
                    "class": "ethernet"
                },
                { // pin 17
                    "name": "Ethernet_nLED2",
                    "description": "Low Active Ethernet Activity indicator ( 3.3V signal) Typically a Green LED is connected to this pin: IOL = 8mA @ VOL< 0.4V",
                    "class": "ethernet"
                },
                { // pin 18
                    "name": "Ethernet_SYNC_OUT",
                    "description": "IEEE1588 SYNC Output pin ( 1.8V signal : IOL = 8mA @ VOL< 0.4V )",
                    "class": "ethernet"
                },
                { // pin 19
                    "name": "Ethernet_nLED1",
                    "description": "Low Active Ethernet speed indicator ( 3.3V signal) Typically a Yellow LED is connected to this pin. A low State indicates the 1Gbit or 10Mbit Link : IOL = 8mA @ VOL< 0.4V",
                    "class": "ethernet"
                },
                { // pin 20
                    "name": "EEPROM_nWP",
                    "description": "Leaving floating NB internally pulled up to CM4_3.3V via 100K ( VIL <0.8V) but can be grounded to prevent writing to the on board EEPROM which stores the bootcode",
                    "class": "rpi"
                },
                { // pin 21
                    "name": "Pi_nLED_Activity",
                    "description": "Low Active Pi Activity LED. 20mA Max 5V tolerant ( VOL<0.4V). ( this is the signal that drives the Green LED on the Raspberry Pi 4 Model B )",
                    "class": "rpi"
                },
                { // pin 22
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 23
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 24
                    "name": "GPIO26",
                    "description": "GPIO Typically a 3.3V signal but can be a 1.8V signal by connecting GPIO_Vref to 1.8V.  Internal pull-down",
                    "class": "gpio",
                    "functions": [
                        {
                            "name": "SD0_DAT2",
                            "description": "SDIO0 Data 2",
                            "class": "sdio",
                            "controller_id": "2"
                        },
                        {
                            "name": "Reserved",
                            "description": "Reserved",
                            "class": "reserved"
                        },
                        {
                            "name": "DPI_D22",
                            "description": "DPI Data 22",
                            "class": "dpi"
                        },
                        {
                            "name": "SD1_DAT2",
                            "description": "SDIO1 Data 2",
                            "class": "sdio",
                            "controller_id": "2"
                        },
                        {
                            "name": "ARM_TDI",
                            "description": "JTAG Data In",
                            "class": "jtag"
                        },
                        {
                            "name": "SPI5_CE1_N",
                            "descripion": "SPI5 Chip Select 1",
                            "class": "spi",
                            "controller_id": "5"
                        }
                    ]
                },
                { // pin 25
                    "name": "GPIO21",
                    "description": "GPIO Typically a 3.3V signal but can be a 1.8V signal by connecting GPIO_Vref to 1.8V.  Internal pull-down",
                    "class": "gpio",
                    "functions": [
                        {
                            "name": "PCM_DOUT",
                            "description": "PCM Data Out",
                            "class": "pcm"
                        },
                        {
                            "name": "SD13",
                            "description": "SMI Data 13",
                            "class": "smi"
                        },
                        {
                            "name": "DPI_D17",
                            "description": "DPI Data 17",
                            "class": "dpi"
                        },
                        {
                            "name": "SPI6_SCLK",
                            "description": "SPI6 Clock",
                            "class": "spi",
                            "controller_id": "6"
                        },
                        {
                            "name": "SPI1_SCLK",
                            "description": "SPI1 Clock",
                            "class": "spi",
                            "controller_id": "1"
                        },
                        {
                            "name": "GPCLK1",
                            "descripion": "General Purpose Clock 1",
                            "class": "gpclk",
                            "controller_id": "1"
                        }
                    ]
                },
                { // pin 26
                    "name": "GPIO19",
                    "description": "GPIO Typically a 3.3V signal but can be a 1.8V signal by connecting GPIO_Vref to 1.8V.  Internal pull-down",
                    "class": "gpio",
                    "functions": [
                        {
                            "name": "PCM_FS",
                            "description": "PCM Frame Sync",
                            "class": "pcm"
                        },
                        {
                            "name": "SD11",
                            "description": "SMI Data 11",
                            "class": "smi"
                        },
                        {
                            "name": "DPI_D15",
                            "description": "DPI Data 15",
                            "class": "dpi"
                        },
                        {
                            "name": "SPI6_MISO",
                            "description": "SPI6 MISO",
                            "class": "spi",
                            "controller_id": "6"
                        },
                        {
                            "name": "SPI1_MISO",
                            "description": "SPI1 MISO",
                            "class": "spi",
                            "controller_id": "1"
                        },
                        {
                            "name": "PWM0_1",
                            "description": "PWM0 Channel 0",
                            "class": "pwm",
                            "controller_id": "0"
                        }
                    ]
                },
                { // pin 27
                    "name": "GPIO20",
                    "description": "GPIO Typically a 3.3V signal but can be a 1.8V signal by connecting GPIO_Vref to 1.8V.  Internal pull-down",
                    "class": "gpio",
                    "functions": [
                        {
                            "name": "PCM_DIN",
                            "description": "PCM Data In",
                            "class": "pcm"
                        },
                        {
                            "name": "SD12",
                            "description": "SMI Data 12",
                            "class": "smi"
                        },
                        {
                            "name": "DPI_D16",
                            "description": "DPI Data 16",
                            "class": "dpi"
                        },
                        {
                            "name": "SPI6_MOSI",
                            "description": "SPI6 MOSI",
                            "class": "spi",
                            "controller_id": "6"
                        },
                        {
                            "name": "SPI1_MOSI",
                            "description": "SPI1 MOSI",
                            "class": "spi",
                            "controller_id": "1"
                        },
                        {
                            "name": "GPCLK0",
                            "description": "General Purpose Clock 0",
                            "class": "gpclk",
                            "controller_id": "0"
                        }
                    ]
                },
                { // pin 28
                    "name": "GPIO13",
                    "description": "GPIO Typically a 3.3V signal but can be a 1.8V signal by connecting GPIO_Vref to 1.8V.  Internal pull-down",
                    "class": "gpio",
                    "functions": [
                        {
                            "name": "PWM0_1",
                            "description": "PWM 0 Channel 1",
                            "class": "pwm",
                            "controller_id": "0"
                        },
                        {
                            "name": "SD5",
                            "description": "SMI Data 5",
                            "class": "smi"
                        },
                        {
                            "name": "DPI_D9",
                            "description": "DPI Data 9",
                            "class": "dpi"
                        },
                        {
                            "name": "SPI5_MISO",
                            "description": "SPI5 MISO",
                            "class": "spi",
                            "controller_id": "5"
                        },
                        {
                            "name": "RX5",
                            "description": "UART5 Receive",
                            "class": "uart",
                            "controller_id": "5"
                        },
                        {
                            "name": "SCL5",
                            "description": "I2C5 Clock",
                            "class": "i2c",
                            "controller_id": "5"
                        }
                    ]
                },
                { // pin 29
                    "name": "GPIO16",
                    "description": "GPIO Typically a 3.3V signal but can be a 1.8V signal by connecting GPIO_Vref to 1.8V.  Internal pull-down",
                    "class": "gpio",
                    "functions": [
                        {
                            "name": "Reserved",
                            "description": "Reserved",
                            "class": "reserved"
                        },
                        {
                            "name": "SD8",
                            "description": "SMI Data 8",
                            "class": "smi"
                        },
                        {
                            "name": "DPI_D12",
                            "description": "DPI Data 12",
                            "class": "dpi"
                        },
                        {
                            "name": "CTS0",
                            "description": "UART0 CTS",
                            "class": "uart",
                            "controller_id": "0"
                        },
                        {
                            "name": "SPI1_CE2_N",
                            "description": "SPI1 Chip Select 2",
                            "class": "spi",
                            "controller_id": "1"
                        },
                        {
                            "name": "CTS1",
                            "description": "UART1 CTS",
                            "class": "uart",
                            "controller_id": "1"
                        }
                    ]
                },
                { // pin 30
                    "name": "GPIO6",
                    "description": "GPIO Typically a 3.3V signal but can be a 1.8V signal by connecting GPIO_Vref to 1.8V.  Internal pull-up",
                    "class": "gpio",
                    "functions": [
                        {
                            "name": "GPCLK2",
                            "description": "General Purpose Clock 2",
                            "class": "gpclk",
                            "controller_id": "2"
                        },
                        {
                            "name": "SOE_N / SE",
                            "description": "SMI Controls",
                            "class": "smi"
                        },
                        {
                            "name": "DPI_D2",
                            "description": "DPI Data 2",
                            "class": "dpi"
                        },
                        {
                            "name": "SPI4_MOSI",
                            "description": "SPI4 MOSI",
                            "class": "spi",
                            "controller_id": "4"
                        },
                        {
                            "name": "CTS3",
                            "description": "UART3 CTS",
                            "class": "uart",
                            "controller_id": "3"
                        },
                        {
                            "name": "SDA4",
                            "description": "I2C4 Data",
                            "class": "i2c",
                            "controller_id": "4"
                        }
                    ]
                },
                { // pin 31
                    "name": "GPIO12",
                    "description": "GPIO Typically a 3.3V signal but can be a 1.8V signal by connecting GPIO_Vref to 1.8V.  Internal pull-down",
                    "class": "gpio",
                    "functions": [
                        {
                            "name": "PWM0_0",
                            "description": "PWM0 Channel 0",
                            "class": "pwm",
                            "controller_id": "0"
                        },
                        {
                            "name": "SD4",
                            "description": "SMI Data 4",
                            "class": "smi"
                        },
                        {
                            "name": "DPI_D8",
                            "description": "DPI Data 8",
                            "class": "dpi"
                        },
                        {
                            "name": "SPI5_CE0_N",
                            "description": "SPI5 Chip Select 0",
                            "class": "spi",
                            "controller_id": "5"
                        },
                        {
                            "name": "TXD5",
                            "description": "UART5 Transmit",
                            "class": "uart",
                            "controller_id": "5"
                        },
                        {
                            "name": "SDA5",
                            "description": "I2C5 Data",
                            "class": "i2c",
                            "controller_id": "5"
                        }
                    ]
                },
                { // pin 32
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 33
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 34
                    "name": "GPIO5",
                    "description": "GPIO Typically a 3.3V signal but can be a 1.8V signal by connecting GPIO_Vref to 1.8V.  Internal pull-up",
                    "class": "gpio",
                    "functions": [
                        {
                            "name": "GPCLK1",
                            "description": "General Purpose Clock 1",
                            "class": "gpclk",
                            "controller_id": "1"
                        },
                        {
                            "name": "SA0",
                            "description": "SMI Address 0",
                            "class": "smi"
                        },
                        {
                            "name": "DPI_D1",
                            "description": "DPI Data 1",
                            "class": "dpi"
                        },
                        {
                            "name": "SPI4_MISO",
                            "description": "SPI4 MISO",
                            "class": "spi",
                            "controller_id": "4"
                        },
                        {
                            "name": "RXD3",
                            "description": "UART3 Receive",
                            "class": "uart",
                            "controller_id": "3"
                        },
                        {
                            "name": "SCL3",
                            "description": "I2C3 Clock",
                            "class": "i2c",
                            "controller_id": "3"
                        }
                    ]
                },
                { // pin 35
                    "name": "ID_SC",
                    "description": "(BCM2711 GPIO 1) GPIO Typically a 3.3V signal but can be a 1.8V signal by connecting GPIO_Vref to 1.8V",
                    "class": "rpi",
                    "other_classes": ["hat-i2c"],
                    "functions": [
                        {
                            "name": "SCL0",
                            "description": "I2C0 Clock",
                            "class": "i2c",
                            "controller_id": "0"
                        },
                        {
                            "name": "SA4",
                            "description": "SMI Address 4",
                            "class": "smi"
                        },
                        {
                            "name": "DPI_DE",
                            "description": "DPI Data Enable",
                            "class": "dpi"
                        },
                        {
                            "name": "SPI3_MISO",
                            "description": "SPI3 MISO",
                            "class": "spi",
                            "controller_id": "3"
                        },
                        {
                            "name": "RXD2",
                            "description": "UART2 Receive",
                            "class": "uart",
                            "controller_id": "2"
                        },
                        {
                            "name": "SCL6",
                            "description": "I2C6 Clock",
                            "class": "i2c",
                            "controller_id": "6"
                        }
                    ]
                },
                { // pin 36
                    "name": "ID_SD",
                    "description": "(BCM2711 GPIO 0) GPIO Typically a 3.3V signal but can be a 1.8V signal by connecting GPIO_Vref to 1.8V",
                    "class": "rpi",
                    "other_classes": ["hat-i2c"],
                    "functions": [
                        {
                            "name": "SDA0",
                            "description": "I2C0 Data",
                            "class": "i2c",
                            "controller_id": "0"
                        },
                        {
                            "name": "SA5",
                            "description": "SMI Address 5",
                            "class": "smi"
                        },
                        {
                            "name": "DPI_PCLK",
                            "description": "DPI Pixel Clock",
                            "class": "dpi"
                        },
                        {
                            "name": "SPI3_CE0_N",
                            "description": "SPI3 Chip Select 0",
                            "class": "spi",
                            "controller_id": "3"
                        },
                        {
                            "name": "TXD2",
                            "description": "UART2 Transmit",
                            "class": "uart",
                            "controller_id": "2"
                        },
                        {
                            "name": "SDA6",
                            "description": "I2C6 Data",
                            "class": "i2c",
                            "controller_id": "6"
                        }
                    ]
                },
                { // pin 37
                    "name": "GPIO7",
                    "description": "GPIO Typically a 3.3V signal but can be a 1.8V signal by connecting GPIO_Vref to 1.8V.  Internal pull-up",
                    "class": "gpio",
                    "functions": [
                        {
                            "name": "SPI0_CE1_N",
                            "description": "SPI0 Chip Select 1",
                            "class": "spi",
                            "controller_id": "0"
                        },
                        {
                            "name": "SWE_N / SRW_N",
                            "description": "SMI Control",
                            "class": "smi"
                        },
                        {
                            "name": "DPI_D3",
                            "description": "DPI Data 3",
                            "class": "dpi"
                        },
                        {
                            "name": "SPI4_SCLK",
                            "description": "SPI4 Clock",
                            "class": "spi",
                            "controller_id": "4"
                        },
                        {
                            "name": "RTS3",
                            "description": "UART3 RTS",
                            "class": "uart",
                            "controller_id": "3"
                        },
                        {
                            "name": "SCL4",
                            "description": "I2C4 Clock",
                            "class": "i2c",
                            "controller_id": "4"
                        }
                    ]
                },
                { // pin 38
                    "name": "GPIO11",
                    "description": "GPIO Typically a 3.3V signal but can be a 1.8V signal by connecting GPIO_Vref to 1.8V.  Internal pull-down",
                    "class": "gpio",
                    "functions": [
                        {
                            "name": "SPI0_SCLK",
                            "description": "SPI0 Clock",
                            "class": "spi",
                            "controller_id": "0"
                        },
                        {
                            "name": "SD3",
                            "description": "SMI Data 3",
                            "class": "smi"
                        },
                        {
                            "name": "DPI_D7",
                            "description": "DPI Data 7",
                            "class": "dpi"
                        },
                        {
                            "name": "BSCSL SCL / SCLK",
                            "description": "BSC SPI Peripheral and I2C Device Clock",
                            "class": "spi",
                            "controller_id": "bsc"
                        },
                        {
                            "name": "RTS4",
                            "description": "UART4 RTS",
                            "class": "uart",
                            "controller_id": "4"
                        },
                        {
                            "name": "SCL5",
                            "description": "I2C5 SCL",
                            "class": "i2c",
                            "controller_id": "5"
                        }
                    ]
                },
                { // pin 39
                    "name": "GPIO8",
                    "description": "GPIO Typically a 3.3V signal but can be a 1.8V signal by connecting GPIO_Vref to 1.8V.  Internal pull-up",
                    "class": "gpio",
                    "functions": [
                        {
                            "name": "SPI0_CE0_N",
                            "description": "SPI0 Chip Select 0",
                            "class": "spi",
                            "controller_id": "0"
                        },
                        {
                            "name": "SD0",
                            "description": "SMI Data 0",
                            "class": "smi"
                        },
                        {
                            "name": "DPI_D4",
                            "description": "DPI Data 4",
                            "class": "dpi"
                        },
                        {
                            "name": "BSCSL CE_N",
                            "description": "BSC SPI Peripheral Chip Select",
                            "class": "spi",
                            "controller_id": "bsc"
                        },
                        {
                            "name": "TXD4",
                            "description": "UART4 Transmit",
                            "class": "uart",
                            "controller_id": "4"
                        },
                        {
                            "name": "SDA4",
                            "description": "I2C4 SDA",
                            "class": "i2c",
                            "controller_id": "4"
                        }
                    ]
                },
                { // pin 40
                    "name": "GPIO9",
                    "description": "GPIO Typically a 3.3V signal but can be a 1.8V signal by connecting GPIO_Vref to 1.8V.  Internal pull-down",
                    "class": "gpio",
                    "functions": [
                        {
                            "name": "SPI0_MISO",
                            "description": "SPI0 MISO",
                            "class": "spi",
                            "controller_id": "0"
                        },
                        {
                            "name": "SD1",
                            "description": "SMI Data 1",
                            "class": "smi"
                        },
                        {
                            "name": "DPI_D5",
                            "description": "DPI Data 5",
                            "class": "dpi"
                        },
                        {
                            "name": "BSCSL MISO",
                            "description": "BSC SPI Peripheral MISO",
                            "class": "spi",
                            "controller_id": "bsc"
                        },
                        {
                            "name": "RXD4",
                            "description": "UART4 Receive",
                            "class": "uart",
                            "controller_id": "4"
                        },
                        {
                            "name": "SCL4",
                            "description": "I2C4 SCL",
                            "class": "i2c",
                            "controller_id": "4"
                        }
                    ]
                },
                { // pin 41
                    "name": "GPIO25",
                    "description": "GPIO Typically a 3.3V signal but can be a 1.8V signal by connecting GPIO_Vref to 1.8V.  Internal pull-down",
                    "class": "gpio",
                    "functions": [
                        {
                            "name": "SD0_DAT1",
                            "description": "SDIO0 Data 1",
                            "class": "sdio",
                            "controller_id": "0"
                        },
                        {
                            "name": "SD17",
                            "description": "SMI Data 17",
                            "class": "smi"
                        },
                        {
                            "name": "DPI_D21",
                            "description": "DPI Data 21",
                            "class": "dpi"
                        },
                        {
                            "name": "SD1_DAT1",
                            "description": "SDIO1 Data 1",
                            "class": "sdio",
                            "controller_id": "1"
                        },
                        {
                            "name": "ARM_TCK",
                            "description": "JTAG Clock",
                            "class": "jtag"
                        },
                        {
                            "name": "SPI4_CE1_N",
                            "description": "SPI4 Chip Select 1",
                            "class": "spi",
                            "controller_id": "4"
                        }
                    ]
                },
                { // pin 42
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 43
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 44
                    "name": "GPIO10",
                    "description": "GPIO Typically a 3.3V signal but can be a 1.8V signal by connecting GPIO_Vref to 1.8V.  Internal pull-down",
                    "class": "gpio",
                    "functions": [
                        {
                            "name": "SPI0_MOSI",
                            "description": "SPI0 MOSI",
                            "class": "spi",
                            "controller_id": "0"
                        },
                        {
                            "name": "SD2",
                            "description": "SMI Data 2",
                            "class": "smi"
                        },
                        {
                            "name": "DPI_D6",
                            "description": "DPI Data 6",
                            "class": "dpi"
                        },
                        {
                            "name": "BSCSL SDA / MOSI",
                            "description": "BSC SPI Peripheral MOSI and I2C Device Data",
                            "class": "spi",
                            "controller_id": "bsc"
                        },
                        {
                            "name": "CTS4",
                            "description": "UART4 CTS",
                            "class": "uart",
                            "controller_id": "4"
                        },
                        {
                            "name": "SDA5",
                            "description": "I2C5 Data",
                            "class": "i2c",
                            "controller_id": "5"
                        }
                    ]
                },
                { // pin 45
                    "name": "GPIO24",
                    "description": "GPIO Typically a 3.3V signal but can be a 1.8V signal by connecting GPIO_Vref to 1.8V.  Internal pull-down",
                    "class": "gpio",
                    "functions": [
                        {
                            "name": "SD0_DAT0",
                            "description": "SDIO0 Data 0",
                            "class": "sdio",
                            "controller_id": "0"
                        },
                        {
                            "name": "SD16",
                            "description": "SMI Data 16",
                            "class": "smi"
                        },
                        {
                            "name": "DPI_D20",
                            "description": "DPI Data 20",
                            "class": "dpi"
                        },
                        {
                            "name": "SD1_DAT0",
                            "description": "SDIO1 Data01",
                            "class": "sdio",
                            "controller_id": "1"
                        },
                        {
                            "name": "ARM_TDO",
                            "description": "JTAG Data Out",
                            "class": "jtag"
                        },
                        {
                            "name": "SPI3_CE1_N",
                            "description": "SPI3 Chip Select 1",
                            "class": "spi",
                            "controller_id": "3"
                        }
                    ]
                },
                { // pin 46
                    "name": "GPIO22",
                    "description": "GPIO Typically a 3.3V signal but can be a 1.8V signal by connecting GPIO_Vref to 1.8V.  Internal pull-down",
                    "class": "gpio",
                    "functions": [
                        {
                            "name": "SD0_CLK",
                            "description": "SDIO0 Clock",
                            "class": "sdio",
                            "controller_id": "0"
                        },
                        {
                            "name": "SD14",
                            "description": "SMI Data 14",
                            "class": "smi"
                        },
                        {
                            "name": "DPI_D18",
                            "description": "DPI Data 18",
                            "class": "dpi"
                        },
                        {
                            "name": "SD1_CLK",
                            "description": "SDIO1 Clock",
                            "class": "sdio",
                            "controller_id": "1"
                        },
                        {
                            "name": "ARM_TRST",
                            "description": "JTAG Reset",
                            "class": "jtag"
                        },
                        {
                            "name": "SDA6",
                            "description": "I2C6 Data",
                            "class": "i2c",
                            "controller_id": "6"
                        }
                    ]
                },
                { // pin 47
                    "name": "GPIO23",
                    "description": "GPIO Typically a 3.3V signal but can be a 1.8V signal by connecting GPIO_Vref to 1.8V.  Internal pull-down",
                    "class": "gpio",
                    "functions": [
                        {
                            "name": "SD0_CMD",
                            "description": "SDIO0 Command",
                            "class": "sdio",
                            "controller_id": "0"
                        },
                        {
                            "name": "SD15",
                            "description": "SMI Data 15",
                            "class": "smi"
                        },
                        {
                            "name": "DPI_D19",
                            "description": "DPI Data 19",
                            "class": "dpi"
                        },
                        {
                            "name": "SD1_CMD",
                            "description": "SDIO1 Command",
                            "class": "sdio",
                            "controller_id": "1"
                        },
                        {
                            "name": "ARM_RTCK",
                            "description": "JTAG Return Clock",
                            "class": "jtag"
                        },
                        {
                            "name": "SCL6",
                            "description": "I2C6 Clock",
                            "class": "i2c",
                            "controller_id": "6"
                        }
                    ]
                },
                { // pin 48
                    "name": "GPIO27",
                    "description": "GPIO Typically a 3.3V signal but can be a 1.8V signal by connecting GPIO_Vref to 1.8V.  Internal pull-down",
                    "class": "gpio",
                    "functions": [
                        {
                            "name": "SD0_DAT3",
                            "description": "SDIO0 Data 3",
                            "class": "sdio",
                            "controller_id": "0"
                        },
                        {
                            "name": "Reserved",
                            "description": "Reserved",
                            "class": "reserved"
                        },
                        {
                            "name": "DPI_D23",
                            "description": "DPI Data 23",
                            "class": "dpi"
                        },
                        {
                            "name": "SD1_DAT3",
                            "description": "SDIO1 Data 3",
                            "class": "sdio",
                            "controller_id": "1"
                        },
                        {
                            "name": "ARM_TMS",
                            "description": "JTAG Mode Select",
                            "class": "jtag"
                        },
                        {
                            "name": "SPI6_CE1_N",
                            "description": "SPI6 Chip Select 1",
                            "class": "spi",
                            "controller_id": "6"
                        }
                    ]
                },
                { // pin 49
                    "name": "GPIO18",
                    "description": "GPIO Typically a 3.3V signal but can be a 1.8V signal by connecting GPIO_Vref to 1.8V.  Internal pull-down",
                    "class": "gpio",
                    "functions": [
                        {
                            "name": "PCM_CLK",
                            "description": "PCM Clock",
                            "class": "pcm"
                        },
                        {
                            "name": "SD10",
                            "description": "SMI Data 10",
                            "class": "smi"
                        },
                        {
                            "name": "DPI_D14",
                            "description": "DPI Data 14",
                            "class": "dpi"
                        },
                        {
                            "name": "SPI6_CE0_N",
                            "description": "SPI6 Chip Select 0",
                            "class": "spi",
                            "controller_id": "6"
                        },
                        {
                            "name": "SPI1_CE0_N",
                            "description": "SPI1 Chip Select 0",
                            "class": "spi",
                            "controller_id": "1"
                        },
                        {
                            "name": "PWM0_0",
                            "description": "PWM0 Channel 0",
                            "class": "pwm",
                            "controller_id": "0"
                        }
                    ]
                },
                { // pin 50
                    "name": "GPIO17",
                    "description": "GPIO Typically a 3.3V signal but can be a 1.8V signal by connecting GPIO_Vref to 1.8V.  Internal pull-down",
                    "class": "gpio",
                    "functions": [
                        {
                            "name": "Reserved",
                            "description": "Reserved",
                            "class": "reserved"
                        },
                        {
                            "name": "SD9",
                            "description": "SMI Data 9",
                            "class": "smi"
                        },
                        {
                            "name": "DPI_D13",
                            "description": "DPI Data 13",
                            "class": "dpi"
                        },
                        {
                            "name": "RTS0",
                            "description": "UART0 RTS",
                            "class": "uart",
                            "controller_id": "0"
                        },
                        {
                            "name": "SPI1_CE1_N",
                            "description": "SPI1 Chip Select 1",
                            "class": "spi",
                            "controller_id": "1"
                        },
                        {
                            "name": "RTS1",
                            "description": "UART1 RTS",
                            "class": "uart",
                            "controller_id": "1"
                        }
                    ]
                },
                { // pin 51
                    "name": "GPIO15",
                    "description": "GPIO Typically a 3.3V signal but can be a 1.8V signal by connecting GPIO_Vref to 1.8V.  Internal pull-down",
                    "class": "gpio",
                    "functions": [
                        {
                            "name": "RXD0",
                            "description": "UART0 Receive",
                            "class": "uart",
                            "controller_id": "0"
                        },
                        {
                            "name": "SD7",
                            "description": "SMI Data 7",
                            "class": "smi"
                        },
                        {
                            "name": "DPI_D11",
                            "description": "DPI Data 11",
                            "class": "dpi"
                        },
                        {
                            "name": "SPI5_SCLK",
                            "description": "SPI5 Clock",
                            "class": "spi",
                            "controller_id": "5"
                        },
                        {
                            "name": "RTS5",
                            "description": "UART5 RTS",
                            "class": "uart",
                            "controller_id": "5"
                        },
                        {
                            "name": "RXD1",
                            "description": "UART1 Receive",
                            "class": "uart",
                            "controller_id": "1"
                        }
                    ]
                },
                { // pin 52
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 53
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 54
                    "name": "GPIO4",
                    "description": "GPIO Typically a 3.3V signal but can be a 1.8V signal by connecting GPIO_Vref to 1.8V.  Internal pull-up",
                    "class": "gpio",
                    "functions": [
                        {
                            "name": "GPCLK0",
                            "description": "General Purpose Clock 0",
                            "class": "gpclk",
                            "controller_id": "0"
                        },
                        {
                            "name": "SA1",
                            "description": "SMI Address 1",
                            "class": "smi"
                        },
                        {
                            "name": "DPI_D0",
                            "description": "DPI Data 0",
                            "class": "dpi"
                        },
                        {
                            "name": "SPI4_CE0_N",
                            "description": "SPI4 Chip Select 0",
                            "class": "spi",
                            "controller_id": "4"
                        },
                        {
                            "name": "TXD3",
                            "description": "UART3 Transmit",
                            "class": "uart",
                            "controller_id": "3"
                        },
                        {
                            "name": "SDA3",
                            "description": "I2C3 Data",
                            "class": "i2c",
                            "controller_id": "3"
                        }
                    ]
                },
                { // pin 55
                    "name": "GPIO14",
                    "description": "GPIO Typically a 3.3V signal but can be a 1.8V signal by connecting GPIO_Vref to 1.8V.  Internal pull-down",
                    "class": "gpio",
                    "functions": [
                        {
                            "name": "TXD0",
                            "description": "UART0 Transmit",
                            "class": "uart",
                            "controller_id": "0"
                        },
                        {
                            "name": "SD6",
                            "description": "SMI Data 6",
                            "class": "smi"
                        },
                        {
                            "name": "DPI_D10",
                            "description": "DPI Data 10",
                            "class": "dpi"
                        },
                        {
                            "name": "SPI5_MOSI",
                            "description": "SPI5 MOSI",
                            "class": "spi",
                            "controller_id": "5"
                        },
                        {
                            "name": "CTS5",
                            "description": "UART5 CTS",
                            "class": "uart",
                            "controller_id": "5"
                        },
                        {
                            "name": "TXD1",
                            "description": "UART1 Transmit",
                            "class": "uart",
                            "controller_id": "1"
                        }
                    ]
                },
                { // pin 56
                    "name": "GPIO3",
                    "description": "GPIO Typically a 3.3V signal but can be a 1.8V signal by connecting GPIO_Vref to 1.8V.  Internal pull-up",
                    "class": "gpio",
                    "functions": [
                        {
                            "name": "SCL1",
                            "description": "I2C1 Clock",
                            "class": "i2c",
                            "controller_id": "1"
                        },
                        {
                            "name": "SA2",
                            "description": "SMI Address 2",
                            "class": "smi"
                        },
                        {
                            "name": "LCD_HSYNC",
                            "description": "DPI Horizonal Sync",
                            "class": "dpi"
                        },
                        {
                            "name": "SPI3_SCLK",
                            "description": "SPI3 Clock",
                            "class": "spi",
                            "controller_id": "3"
                        },
                        {
                            "name": "RTS2",
                            "description": "UART2 RTS",
                            "class": "uart",
                            "controller_id": "2"
                        },
                        {
                            "name": "SCL3",
                            "description": "I2C3 Clock",
                            "class": "i2c",
                            "controller_id": "3"
                        }
                    ]
                },
                { // pin 57
                    "name": "SD_CLK",
                    "description": "SDCARD Clock signal (only available on CM4Lite)",
                    "class": "sdio",
                    "controller_id": "sd"
                },
                { // pin 58
                    "name": "GPIO2",
                    "description": "GPIO Typically a 3.3V signal but can be a 1.8V signal by connecting GPIO_Vref to 1.8V.  Internal pull-up",
                    "class": "gpio",
                    "functions": [
                        {
                            "name": "SDA1",
                            "description": "I2C1 Data",
                            "class": "i2c",
                            "controller_id": "1"
                        },
                        {
                            "name": "SA3",
                            "description": "SMI Address 3",
                            "class": "smi"
                        },
                        {
                            "name": "LCD_VSYNC",
                            "description": "DPI Vertcal Sync",
                            "class": "dpi"
                        },
                        {
                            "name": "SPI3_MOSI",
                            "description": "SPI3 MOSI",
                            "class": "spi",
                            "controller_id": "3"
                        },
                        {
                            "name": "CTS2",
                            "description": "UART2 CTS",
                            "class": "uart",
                            "controller_id": "2"
                        },
                        {
                            "name": "SCL3",
                            "description": "I2C3 Clock",
                            "class": "i2c",
                            "controller_id": "3"
                        }
                    ]
                },
                { // pin 59
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 60
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 61
                    "name": "SD_DAT3",
                    "description": "SDCARD/eMMC Data3 signal (only available on CM4Lite)",
                    "class": "sdio",
                    "controller_id": "sd"
                },
                { // pin 62
                    "name": "SD_CMD",
                    "description": "SDCARD/eMMC Command signal (only available on CM4Lite)",
                    "class": "sdio",
                    "controller_id": "sd"
                },
                { // pin 63
                    "name": "SD_DAT0",
                    "description": "SDCARD/eMMC Data0 signal (only available on CM4Lite)",
                    "class": "sdio",
                    "controller_id": "sd"
                },
                { // pin 64
                    "name": "SD_DAT5",
                    "description": "SDCARD/eMMC Data5 signal (only available on CM4Lite)",
                    "class": "sdio",
                    "controller_id": "sd"
                },
                { // pin 65
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 66
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 67
                    "name": "SD_DAT1",
                    "description": "SDCARD/eMMC Data1 signal (only available on CM4Lite)",
                    "class": "sdio",
                    "controller_id": "sd"
                },
                { // pin 68
                    "name": "SD_DAT4",
                    "description": "SDCARD/eMMC Data4 signal (only available on CM4Lite)",
                    "class": "sdio",
                    "controller_id": "sd"
                },
                { // pin 69
                    "name": "SD_DAT2",
                    "description": "SDCARD/eMMC Data2 signal (only available on CM4Lite)",
                    "class": "sdio",
                    "controller_id": "sd"
                },
                { // pin 70
                    "name": "SD_DAT7",
                    "description": "SDCARD/eMMC Data7 signal (only available on CM4Lite)",
                    "class": "sdio",
                    "controller_id": "sd"
                },
                { // pin 71
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 72
                    "name": "SD_DAT6",
                    "description": "SDCARD/eMMC Data6 signal (only available on CM4Lite)",
                    "class": "sdio",
                    "controller_id": "sd"
                },
                { // pin 73
                    "name": "SD_VDD_Override",
                    "description": "Force SDCARD/eMMC interface to 1.8V signalling if set to 3.3V, otherwise leave unconnected. Typically only used if external eMMC is connected",
                    "class": "sdio",
                    "controller_id": "sd"
                },
                { // pin 74
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 75
                    "name": "SD_PWR_ON",
                    "description": "Output to Power switch for the SDCARD. The CM4 sets this pin High (3.3V) to signal that Power to the SDCARD should be turned on. If booting from the SDCARD is required then a pullup should also be fitted so the power defaults to on. (only available on CM4Lite)",
                    "class": "sdio",
                    "controller_id": "sd"
                },
                { // pin 76
                    "name": "Reserved",
                    "description": "Reserved",
                    "class": "reserved"
                },
                { // pin 77
                    "name": "+5V (Input)",
                    "description": "4.75V - 5.25V Main power input",
                    "class": "power",
                    "controller_id": "5v"
                },
                { // pin 78
                    "name": "GPIO_VREF",
                    "description": "Must be connected to CM4_3.3V ( pins 84 and 86 ) for 3.3V GPIO or CM4_1.8V ( pins 88 and 90) for 1.8V GPIO. This pin cannot be floating or connected to ground",
                    "class": "power",
                    "controller_id": "gpio"
                },
                { // pin 79
                    "name": "+5V (Input)",
                    "description": "4.75V - 5.25V Main power input",
                    "class": "power",
                    "controller_id": "5v"
                },
                { // pin 80
                    "name": "SCL0",
                    "description": "IIC Clock pin ( BCM2711 GPIO45) Typically used for Camera and Display Internal 1.8K pull up to CM4_3.3V",
                    "class": "i2c",
                    "controller_id": "0",
                    "other_classes": ["hat-i2c"],
                    "functions": [
                        {
                            "name": "PWM0_1",
                            "description": "PWM0 Channel 1",
                            "class": "pwm",
                            "controller_id": "0"
                        },
                        {
                            "name": "SCL0",
                            "description": "I2C0 Cloc",
                            "class": "i2c",
                            "controller_id": "0"
                        },
                        {
                            "name": "SCL1",
                            "description": "I2C1 Clock",
                            "class": "i2c",
                            "controller_id": "1"
                        },
                        {
                            "name": "Reserved",
                            "description": "Reserved",
                            "class": "reserved"
                        },
                        {
                            "name": "SPI0_CE2_N",
                            "description": "SPI0 Chip Select 2",
                            "class": "spi",
                            "controller_id": "0"
                        },
                        {
                            "name": "SD_CARD_PWR0",
                            "description": "???",
                            "class": "sdio",
                            "controller_id": "sd"
                        }
                    ]
                },
                { // pin 81
                    "name": "+5V (Input)",
                    "description": "4.75V - 5.25V Main power input",
                    "class": "power",
                    "controller_id": "5v"
                },
                { // pin 82
                    "name": "SDA0",
                    "description": "IIC Data pin ( BCM2711 GPIO44) Typically used for Camera and Display Internal 1.8K pull up to CM4_3.3V",
                    "class": "i2c",
                    "controller_id": "0",
                    "other_classes": ["hat-i2c"],
                    "functions": [
                        {
                            "name": "GPCLK1",
                            "description": "General Purpose Clock 1",
                            "class": "gpclk",
                            "controller_id": "1"
                        },
                        {
                            "name": "SDA0",
                            "description": "I2C0 Data",
                            "class": "i2c",
                            "controller_id": "0"
                        },
                        {
                            "name": "SDA1",
                            "description": "I2C1 Data",
                            "class": "i2c",
                            "controller_id": "1"
                        },
                        {
                            "name": "Reserved",
                            "description": "Reserved",
                            "class": "reserved"
                        },
                        {
                            "name": "SPI0_CE1_N",
                            "description": "SPI0 Chip Select 1",
                            "class": "spi",
                            "controller_id": "0"
                        },
                        {
                            "name": "SD_CARD_VOLT",
                            "description": "???",
                            "class": "sdio",
                            "controller_id": "sd"
                        }
                    ]
                },
                { // pin 83
                    "name": "+5V (Input)",
                    "description": "4.75V - 5.25V Main power input",
                    "class": "power",
                    "controller_id": "5v"
                },
                { // pin 84
                    "name": "CM4_3.3V (Output)",
                    "description": "3.3V +/-2.5% Power Output max 300mA per pin for a total of 600mA. This will be powered down during power off or GLOBAL_EN being set low",
                    "class": "power",
                    "controller_id": "3v3"
                },
                { // pin 85
                    "name": "+5V (Input)",
                    "description": "4.75V - 5.25V Main power input",
                    "class": "power",
                    "controller_id": "5v"
                },
                { // pin 86
                    "name": "CM4_3.3V (Output)",
                    "description": "3.3V +/-2.5% Power Output max 300mA per pin for a total of 600mA. This will be powered down during power off or GLOBAL_EN being set low",
                    "class": "power",
                    "controller_id": "3v3"
                },
                { // pin 87
                    "name": "+5V (Input)",
                    "description": "4.75V - 5.25V Main power input",
                    "class": "power",
                    "controller_id": "5v"
                },
                { // pin 88
                    "name": "CM4_1.8V (Output)",
                    "description": "1.8V +/-2.5% Power Output max 300mA per pin for a total of 600mA. This will be powered down during power off or GLOBAL_EN being set low",
                    "class": "power",
                    "controller_id": "1v8"
                },
                { // pin 89
                    "name": "WL_nDisable",
                    "description": "Can be left floating.  If driven low the wireless interface will be disabled. Internal pulled up via 1.8K to CM4_3.3V",
                    "class": "rpi",
                },
                { // pin 90
                    "name": "CM4_1.8V (Output)",
                    "description": "1.8V +/-2.5% Power Output max 300mA per pin for a total of 600mA. This will be powered down during power off or GLOBAL_EN being set low",
                    "class": "power",
                    "controller_id": "1v8"
                },
                { // pin 91
                    "name": "BT_nDisable",
                    "description": "Can be left floating.  If driven low the Bluetooth interface will be disabled. Internal pulled up via 1.8K to CM4_3.3V",
                    "class": "rpi"
                },
                { // pin 92
                    "name": "RUN_PG",
                    "description": "Bidirectional pin. Can be driven low ( via a 220R resistor) to Reset the CM4 CPU. As an Output a high signals Power Good and CPU running. Internally pulled up to +3.3V via 10K",
                    "class": "rpi"
                },
                { // pin 93
                    "name": "nRPIBOOT",
                    "description": "A low on this pin forces booting from an RPI server ( e.g. PC or a Raspberry Pi)  if not used leave floating. Internally pulled up via 10K to +3.3V",
                    "class": "rpi"
                },
                { // pin 94
                    "name": "AnalogIP1",
                    "description": "Analogue input of the MXL7704. Typically connected to CC pin of Type C power connector",
                    "class": "rpi"
                },
                { // pin 95
                    "name": "PI_LED_nPWR",
                    "description": "Low active Output to drive Power On LED. This signal needs to be buffered.",
                    "class": "rpi"
                },
                { // pin 96
                    "name": "AnalogIP1",
                    "description": "Analogue input of the MXL7704. Typically connected to CC pin of Type C power connector",
                    "class": "rpi"
                },
                { // pin 97
                    "name": "Camera_GPIO",
                    "description": "Typically used to Shutdown the camera to reduce power. Reassigning this pin to another function isn't recommended. CM4_3.3V signalling",
                    "class": "rpi"
                },
                { // pin 98
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 99
                    "name": "GLOBAL_EN",
                    "description": "Input. Drive low to power off CM4. Internally pulled up with a 100K to +5V",
                    "class": "rpi"
                },
                { // pin 100
                    "name": "nEXTRST",
                    "description": "Output Driven low during reset Driven high (CM4_3.3V) once CM4 CPU has started to boot",
                    "class": "rpi"
                },
                
            ]
        },
        { // header 1
            "table_id": "pin-header-1",
            "pins": [
                { // pin 101
                    "name": "USB_OTG_ID",
                    "description": "Input ( 3.3V signal ) USB OTG Pin. Internal pulled up. When grounded the CM4 becomes a USB host but the correct OS driver also needs to be used",
                    "class": "usb"
                },
                { // pin 102
                    "name": "PCIe_CLK_nREQ",
                    "description": "Input (3.3V signal) PCIe Clock request pin (lock to request PCI clock).  Internal pulled up",
                    "class": "pcie"
                },
                { // pin 103
                    "name": "USB_N",
                    "description": "USB D-",
                    "class": "usb"
                },
                { // pin 104
                    "name": "Reserved",
                    "description": "Reserved",
                    "class": "reserved"
                },
                { // pin 105
                    "name": "USB_P",
                    "description": "USB D+",
                    "class": "usb"
                },
                { // pin 106
                    "name": "Reserved",
                    "description": "Reserved",
                    "class": "reserved"
                },
                { // pin 107
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 108
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 109
                    "name": "PCIe_nRST",
                    "description": "Output (+3.3V signal) PCIe Reset Low active",
                    "class": "pcie"
                },
                { // pin 110
                    "name": "PCIe_CLK_P",
                    "description": "PCIe Clock Out Positive (100MHz) NB AC coupling Capacitor Included on CM4",
                    "class": "pcie"
                },
                { // pin 111
                    "name": "VDAC_COMP",
                    "description": "Analogue Video DAC output (TV OUT)",
                    "class": "tv"
                },
                { // pin 112
                    "name": "PCIe_CLK_N",
                    "description": "PCIe Clock Out Negative (100MHz) NB AC coupling Capacitor Included on CM4",
                    "class": "pcie"
                },
                { // pin 113
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 114
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 115
                    "name": "CAM1_D0_N",
                    "description": "Input Camera1 D0 Negative",
                    "class": "csi",
                    "controller_id": "1"
                },
                { // pin 116
                    "name": "PCIe_RX_P",
                    "description": "Input PCIe GEN 2 RX Positive NB External AC coupling Capacitor required",
                    "class": "pcie"
                },
                { // pin 117
                    "name": "CAM1_D0_P",
                    "description": "Input Camera1 D0 Positive",
                    "class": "csi",
                    "controller_id": "1"
                },
                { // pin 118
                    "name": "PCIe_RX_N",
                    "description": "Input PCIe GEN 2 RX Negative NB External AC coupling Capacitor required",
                    "class": "pcie"
                },
                { // pin 119
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 120
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 121
                    "name": "CAM1_D1_N",
                    "description": "Input Camera1 D1 Negative",
                    "class": "csi",
                    "controller_id": "1"
                },
                { // pin 122
                    "name": "PCIe_TX_P",
                    "description": "Output PCIe GEN 2 TX Positive NB AC coupling Capacitor Included on CM4",
                    "class": "pcie"
                },
                { // pin 123
                    "name": "CAM1_D1_P",
                    "description": "Input Camera1 D1 Positive",
                    "class": "csi",
                    "controller_id": "1"
                },
                { // pin 124
                    "name": "PCIe_TX_N",
                    "description": "Output PCIe GEN 2 TX Negative NB AC coupling Capacitor Included on CM4",
                    "class": "pcie"
                },
                { // pin 125
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 126
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 127
                    "name": "CAM1_C_N",
                    "description": "Input Camera1 Clock Negative",
                    "class": "csi",
                    "controller_id": "1"
                },
                { // pin 128
                    "name": "CAM0_D0_N",
                    "description": "Input Camera0 D0 Negative",
                    "class": "csi",
                    "controller_id": "0"
                },
                { // pin 129
                    "name": "CAM1_C_P",
                    "description": "Input Camera1 Clock Positive",
                    "class": "csi",
                    "controller_id": "1"
                },
                { // pin 130
                    "name": "CAM0_D0_P",
                    "description": "Input Camera0 D0 Positive",
                    "class": "csi",
                    "controller_id": "0"
                },
                { // pin 131
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 132
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 133
                    "name": "CAM1_D2_N",
                    "description": "Input Camera1 D2 Negative",
                    "class": "csi",
                    "controller_id": "1"
                },
                { // pin 134
                    "name": "CAM0_D1_N",
                    "description": "Input Camera0 D1 Negative",
                    "class": "csi",
                    "controller_id": "0"
                },
                { // pin 135
                    "name": "CAM1_D2_P",
                    "description": "Input Camera1 D2 Positive",
                    "class": "csi",
                    "controller_id": "1"
                },
                { // pin 136
                    "name": "CAM0_D1_P",
                    "description": "Input Camera0 D1 Positive",
                    "class": "csi",
                    "controller_id": "0"
                },
                { // pin 137
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 138
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 139
                    "name": "CAM1_D3_N",
                    "description": "Input Camera1 D3 Negative",
                    "class": "csi",
                    "controller_id": "1"
                },
                { // pin 140
                    "name": "CAM0_C_N",
                    "description": "Input Camera0 Clock Negative",
                    "class": "csi",
                    "controller_id": "0"
                },
                { // pin 141
                    "name": "CAM1_D3_P",
                    "description": "Input Camera1 D3 Positive",
                    "class": "csi",
                    "controller_id": "1"
                },
                { // pin 142
                    "name": "CAM0_C_P",
                    "description": "Input Camera0 Clock Positive",
                    "class": "csi",
                    "controller_id": "0"
                },
                { // pin 143
                    "name": "HDMI1_HOTPLUG",
                    "description": "Input HDMI1 Hotplug Internally pulled down with a 100K. 5V tolerant. (It can be connected directly to a HDMI connector a small amount of ESD protection is provided on the CM4 by an on board HDMI05-CL02F3)",
                    "class": "hdmi",
                    "controller_id": "1"
                },
                { // pin 144
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 145
                    "name": "HDMI1_SDA",
                    "description": "Bidir HDMI1 SDA Internally pulled up with a 1.8K. 5V tolerant. (It can be connected directly to a HDMI connector a small amount of ESD protection is provided on the CM4 by an on board HDMI05-CL02F3)",
                    "class": "hdmi",
                    "controller_id": "1"
                },
                { // pin 146
                    "name": "HDMI1_TX2_P",
                    "description": "Output HDMI1 TX2 Positive",
                    "class": "hdmi",
                    "controller_id": "1"
                },
                { // pin 147
                    "name": "HDMI1_SCL",
                    "description": "Bidir HDMI1 SCL Internally pulled up with a 1.8K. 5V tolerant. (It can be connected directly to a HDMI connector a small amount of ESD protection is provided on the CM4 by an on board HDMI05-CL02F3)",
                    "class": "hdmi",
                    "controller_id": "1"
                },
                { // pin 148
                    "name": "HDMI1_TX2_N",
                    "description": "Output HDMI1 TX2 Negative",
                    "class": "hdmi",
                    "controller_id": "1"
                },
                { // pin 149
                    "name": "HDMI1_CEC",
                    "description": "Input HDMI1 CEC Internally pulled up with a 27K. 5V tolerant. (It can be connected directly to a HDMI connector a small amount of ESD protection is provided on the CM4 by an on board HDMI05-CL02F3)",
                    "class": "hdmi",
                    "controller_id": "1"
                },
                { // pin 150
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 151
                    "name": "HDMI0_CEC",
                    "description": "Input HDMI0 CEC Internally pulled up with a 27K. 5V tolerant. (It can be connected directly to a HDMI connector a small amount of ESD protection is provided on the CM4 by an on board HDMI05-CL02F3)",
                    "class": "hdmi",
                    "controller_id": "0"
                },
                { // pin 152
                    "name": "HDMI1_TX1_P",
                    "description": "Output HDMI1 TX1 Positive",
                    "class": "hdmi",
                    "controller_id": "1"
                },
                { // pin 153
                    "name": "HDMI0_HOTPLUG",
                    "description": "Input HDMI0 Hotplug Internally pulled down with a 100K. 5V tolerant. (It can be connected directly to a HDMI connector a small amount of ESD protection is provided on the CM4 by an on board HDMI05-CL02F3)",
                    "class": "hdmi",
                    "controller_id": "0"
                },
                { // pin 154
                    "name": "HDMI1_TX1_N",
                    "description": "Output HDMI1 TX1 Negative",
                    "class": "hdmi",
                    "controller_id": "1"
                },
                { // pin 155
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 156
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 157
                    "name": "DSI0_D0_N",
                    "description": "Output Display0 D0 Negative",
                    "class": "dsi",
                    "controller_id": "0"
                },
                { // pin 158
                    "name": "HDMI1_TX0_P",
                    "description": "Output HDMI1 TX0 Positive",
                    "class": "hdmi",
                    "controller_id": "1"
                },
                { // pin 159
                    "name": "DSI0_D0_P",
                    "description": "Output Display0 D0 Positive",
                    "class": "dsi",
                    "controller_id": "0"
                },
                { // pin 160
                    "name": "HDMI1_TX0_N",
                    "description": "Output HDMI1 TX0 Negative",
                    "class": "hdmi",
                    "controller_id": "1"
                },
                { // pin 161
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 162
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 163
                    "name": "DSI0_D1_N",
                    "description": "Output Display0 D1 Negative",
                    "class": "dsi",
                    "controller_id": "0"
                },
                { // pin 164
                    "name": "HDMI1_CLK_P",
                    "description": "Output HDMI1 Clock Positive",
                    "class": "hdmi",
                    "controller_id": "1"
                },
                { // pin 165
                    "name": "DSI0_D1_P",
                    "description": "Output Display0 D1 Positive",
                    "class": "dsi",
                    "controller_id": "0"
                },
                { // pin 166
                    "name": "HDMI1_CLK_N",
                    "description": "Output HDMI1 Clock Negative",
                    "class": "hdmi",
                    "controller_id": "1"
                },
                { // pin 167
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 168
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 169
                    "name": "DSI0_C_N",
                    "description": "Output Display0 Clock Negative",
                    "class": "dsi",
                    "controller_id": "0"
                },
                { // pin 170
                    "name": "HDMI0_TX2_P",
                    "description": "Output HDMI0 TX2 Positive",
                    "class": "hdmi",
                    "controller_id": "0"
                },
                { // pin 171
                    "name": "DSI0_C_P",
                    "description": "Output Display0 Clock Positive",
                    "class": "dsi",
                    "controller_id": "0"
                },
                { // pin 172
                    "name": "HDMI0_TX2_N",
                    "description": "Output HDMI0 TX2 Negative",
                    "class": "hdmi",
                    "controller_id": "0"
                },
                { // pin 173
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 174
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 175
                    "name": "DSI1_D0_N",
                    "description": "Output Display1 D0 Negative",
                    "class": "dsi",
                    "controller_id": "1"
                },
                { // pin 176
                    "name": "HDMI0_TX1_P",
                    "description": "Output HDMI0 TX1 Positive",
                    "class": "hdmi",
                    "controller_id": "0"
                },
                { // pin 177
                    "name": "DSI1_D0_P",
                    "description": "Output Display1 D0 Positive",
                    "class": "dsi",
                    "controller_id": "1"
                },
                { // pin 178
                    "name": "HDMI0_TX1_N",
                    "description": "Output HDMI0 TX1 Negative",
                    "class": "hdmi",
                    "controller_id": "0"
                },
                { // pin 179
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 180
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 181
                    "name": "DSI1_D1_N",
                    "description": "Output Display1 D1 Negative",
                    "class": "dsi",
                    "controller_id": "1"
                },
                { // pin 182
                    "name": "HDMI0_TX0_P",
                    "description": "Output HDMI0 TX0 Positive",
                    "class": "hdmi",
                    "controller_id": "0"
                },
                { // pin 183
                    "name": "DSI1_D1_P",
                    "description": "Output Display1 D1 Positive",
                    "class": "dsi",
                    "controller_id": "1"
                },
                { // pin 184
                    "name": "HDMI0_TX0_N",
                    "description": "Output HDMI0 TX0 Negative",
                    "class": "hdmi",
                    "controller_id": "0"
                },
                { // pin 185
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 186
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 187
                    "name": "DSI1_C_N",
                    "description": "Output Display1 Clock Negative",
                    "class": "dsi",
                    "controller_id": "1"
                },
                { // pin 188
                    "name": "HDMI0_CLK_P",
                    "description": "Output HDMI0 Clock Positive",
                    "class": "hdmi",
                    "controller_id": "0"
                },
                { // pin 189
                    "name": "DSI1_C_P",
                    "description": "Output Display1 Clock Positive",
                    "class": "dsi",
                    "controller_id": "1"
                },
                { // pin 190
                    "name": "HDMI0_CLK_N",
                    "description": "Output HDMI0 Clock Negative",
                    "class": "hdmi",
                    "controller_id": "0"
                },
                { // pin 191
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 192
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 193
                    "name": "DSI1_D2_N",
                    "description": "Output Display1 D2 Negative",
                    "class": "dsi",
                    "controller_id": "1"
                },
                { // pin 194
                    "name": "DSI1_D3_N",
                    "description": "Output Display1 D3 Negative",
                    "class": "dsi",
                    "controller_id": "1"
                },
                { // pin 195
                    "name": "DSI1_D2_P",
                    "description": "Output Display1 D2 Positive",
                    "class": "dsi",
                    "controller_id": "1"
                },
                { // pin 196
                    "name": "DSI1_D3_P",
                    "description": "Output Display1 D3 Positive",
                    "class": "dsi",
                    "controller_id": "1"
                },
                { // pin 197
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 198
                    "name": "GND",
                    "description": "Ground (0V)",
                    "class": "gnd"
                },
                { // pin 199
                    "name": "HDMI0_SDA",
                    "description": "Bidir HDMI0 SDA Internally pulled up with a 1.8K. 5V tolerant. (It can be connected directly to a HDMI connector a small amount of ESD protection is provided on the CM4 by an on board HDMI05-CL02F3)",
                    "class": "hdmi",
                    "controller_id": "0"
                },
                { // pin 200
                    "name": "HDMI0_SCL",
                    "description": "Bidir HDMI0 SCL Internally pulled up with a 1.8K. 5V tolerant. (It can be connected directly to a HDMI connector a small amount of ESD protection is provided on the CM4 by an on board HDMI05-CL02F3)",
                    "class": "hdmi",
                    "controller_id": "0"
                },
                
                
            ]
        }
    ]
}