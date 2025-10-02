// MCQ Data Structure
const mcqData = {
    msword: {
        "ප්‍රශ්න පත්‍ර අංක 01": [
            {
                question: "අක්ෂර ආකෘතිකරණය සඳහා ඔබ තෝරා ගත යුතු TAB ය කුමක්ද?",
                options: ["Home", "Insert", "Page Layout", "View"],
                answer: 0,
                explanation: "අක්ෂර ආකෘතිකරණ සඳහා විකල්පය MS Word හි Home Tab හී පිහිටා ඇත."
            },
            {
                question: "MS Word හි ලේඛනයක් සුරැකීමට යතුරුපුවරු කෙටිමඟ කුමක්ද?",
                options: [ "Ctrl + P", "Ctrl + S", "Ctrl + O", "Ctrl + N"],
                answer: 2,
                explanation: "Ctrl + S යනු MS Word හි ලේඛනයක් සුරැකීමට ඇති යතුරුපුවරු කෙටිමඟයි."
            },
            {
                question: "Which option is used to insert a page break?",
                options: ["Ctrl + Enter", "Ctrl + P", "Ctrl + B", "Alt + Enter"],
                answer: 0,
                explanation: "Ctrl + Enter inserts a page break in MS Word."
            },
            {
                question: "What does Ctrl + B do in MS Word?",
                options: ["Bold text", "Break page", "Bookmark", "Border"],
                answer: 0,
                explanation: "Ctrl + B applies bold formatting to selected text."
            },
            {
                question: "Which view shows multiple pages at once?",
                options: ["Print Layout", "Web Layout", "Outline", "Draft"],
                answer: 0,
                explanation: "Print Layout view allows you to see multiple pages."
            }
        ],
        "ප්‍රශ්න පත්‍ර අංක 02": [
            {
                question: "Which feature allows you to combine multiple documents into one?",
                options: ["Mail Merge", "Quick Parts", "Smart Art", "Document Map"],
                answer: 0,
                explanation: "Mail Merge is used to combine multiple documents into one."
            },
            {
                question: "What is the shortcut for Find and Replace?",
                options: ["Ctrl + H", "Ctrl + F", "Ctrl + R", "Alt + F"],
                answer: 0,
                explanation: "Ctrl + H opens the Find and Replace dialog box."
            },
            {
                question: "Which tab contains the Table options?",
                options: ["Insert", "Home", "Layout", "Design"],
                answer: 0,
                explanation: "The Insert tab contains options to insert tables."
            },
            {
                question: "What is the extension of MS Word 2016 files?",
                options: [".docx", ".doc", ".txt", ".pdf"],
                answer: 0,
                explanation: "MS Word 2016 files use the .docx extension."
            },
            {
                question: "Which feature checks grammar and spelling?",
                options: ["Spelling & Grammar", "Thesaurus", "Research", "Translate"],
                answer: 0,
                explanation: "Spelling & Grammar checks for errors in the document."
            }
        ]
    },
    msexcel: {
        "Paper 1": [
            {
                question: "What is the symbol for multiplication in Excel formulas?",
                options: ["*", "x", "#", "@"],
                answer: 0,
                explanation: "The asterisk (*) is used for multiplication in Excel formulas."
            },
            {
                question: "Which function calculates the sum of cells?",
                options: ["SUM", "AVERAGE", "COUNT", "MAX"],
                answer: 0,
                explanation: "The SUM function adds up all values in a range."
            },
            {
                question: "What does the $ symbol do in cell references?",
                options: ["Makes it absolute", "Currency format", "Formula marker", "Error indicator"],
                answer: 0,
                explanation: "$ creates an absolute cell reference that doesn't change when copied."
            },
            {
                question: "Which key combination selects all cells?",
                options: ["Ctrl + A", "Ctrl + S", "Alt + A", "Shift + A"],
                answer: 0,
                explanation: "Ctrl + A selects all cells in the worksheet."
            },
            {
                question: "What is the intersection of a row and column called?",
                options: ["Cell", "Range", "Field", "Record"],
                answer: 0,
                explanation: "A cell is where a row and column intersect."
            }
        ],
        "Paper 2": [
            {
                question: "Which chart type shows trends over time?",
                options: ["Line Chart", "Pie Chart", "Bar Chart", "Scatter Chart"],
                answer: 0,
                explanation: "Line charts are best for showing trends over time."
            },
            {
                question: "What does VLOOKUP stand for?",
                options: ["Vertical Lookup", "Value Lookup", "Variable Lookup", "Visual Lookup"],
                answer: 0,
                explanation: "VLOOKUP stands for Vertical Lookup."
            },
            {
                question: "Which function counts non-empty cells?",
                options: ["COUNTA", "COUNT", "COUNTIF", "COUNTBLANK"],
                answer: 0,
                explanation: "COUNTA counts all non-empty cells."
            },
            {
                question: "What is the shortcut to insert current date?",
                options: ["Ctrl + ;", "Ctrl + D", "Alt + D", "Shift + D"],
                answer: 0,
                explanation: "Ctrl + ; inserts the current date."
            },
            {
                question: "Which tab contains Pivot Table options?",
                options: ["Insert", "Data", "Formulas", "Review"],
                answer: 0,
                explanation: "Pivot Tables are created from the Insert tab."
            }
        ]
    },
    msaccess: {
        "Paper 1": [
            {
                question: "Which object in MS Access is used to store data?",
                options: ["Table", "Form", "Query", "Report"],
                answer: 0,
                explanation: "Tables are the primary objects used to store data in MS Access."
            },
            {
                question: "What is a Primary Key?",
                options: ["Unique identifier", "Foreign key", "Index", "Field type"],
                answer: 0,
                explanation: "A Primary Key uniquely identifies each record in a table."
            },
            {
                question: "Which data type stores text in Access?",
                options: ["Short Text", "Number", "Date/Time", "Yes/No"],
                answer: 0,
                explanation: "Short Text data type is used to store text."
            },
            {
                question: "What does a Query do?",
                options: ["Retrieves data", "Stores data", "Prints data", "Deletes database"],
                answer: 0,
                explanation: "Queries retrieve and manipulate data from tables."
            },
            {
                question: "Which view allows you to modify table structure?",
                options: ["Design View", "Datasheet View", "Form View", "Report View"],
                answer: 0,
                explanation: "Design View is used to modify table structure."
            }
        ],
        "Paper 2": [
            {
                question: "What is a Form used for?",
                options: ["Data entry", "Data storage", "Calculations", "Printing only"],
                answer: 0,
                explanation: "Forms provide a user-friendly interface for data entry."
            },
            {
                question: "Which object presents data for printing?",
                options: ["Report", "Form", "Query", "Table"],
                answer: 0,
                explanation: "Reports are designed to present data for printing."
            },
            {
                question: "What does a Relationship connect?",
                options: ["Tables", "Forms", "Queries", "Reports"],
                answer: 0,
                explanation: "Relationships connect tables based on common fields."
            },
            {
                question: "Which data type stores whole numbers?",
                options: ["Number", "Short Text", "Currency", "Date/Time"],
                answer: 0,
                explanation: "Number data type stores numeric values including whole numbers."
            },
            {
                question: "What is the file extension for Access 2016?",
                options: [".accdb", ".mdb", ".xlsx", ".docx"],
                answer: 0,
                explanation: ".accdb is the file extension for Access 2007 and later."
            }
        ]
    },
    mspowerpoint: {
        "Paper 1": [
            {
                question: "Which view shows your presentation as a series of thumbnails?",
                options: ["Slide Sorter", "Normal", "Reading", "Master"],
                answer: 0,
                explanation: "Slide Sorter view shows your presentation as a series of thumbnails."
            },
            {
                question: "What is the shortcut to start a slideshow?",
                options: ["F5", "F1", "F12", "Ctrl + S"],
                answer: 0,
                explanation: "F5 starts the slideshow from the beginning."
            },
            {
                question: "Which tab contains animation options?",
                options: ["Animations", "Transitions", "Insert", "Design"],
                answer: 0,
                explanation: "The Animations tab contains all animation options."
            },
            {
                question: "What is a Transition?",
                options: ["Effect between slides", "Text animation", "Picture effect", "Sound effect"],
                answer: 0,
                explanation: "Transitions are effects that occur between slides."
            },
            {
                question: "Which key stops a running slideshow?",
                options: ["Esc", "Enter", "Space", "Tab"],
                answer: 0,
                explanation: "Esc key stops the running slideshow."
            }
        ],
        "Paper 2": [
            {
                question: "What is a Slide Master?",
                options: ["Template for slides", "First slide", "Last slide", "Hidden slide"],
                answer: 0,
                explanation: "Slide Master is a template that controls the design of all slides."
            },
            {
                question: "Which view is best for editing content?",
                options: ["Normal View", "Slide Sorter", "Reading View", "Slide Show"],
                answer: 0,
                explanation: "Normal View is best for editing slide content."
            },
            {
                question: "What does Ctrl + D do?",
                options: ["Duplicate slide", "Delete slide", "Design slide", "Download slide"],
                answer: 0,
                explanation: "Ctrl + D duplicates the selected slide."
            },
            {
                question: "Which format saves presentations as video?",
                options: [".mp4", ".pptx", ".pdf", ".jpg"],
                answer: 0,
                explanation: ".mp4 format saves presentations as video files."
            },
            {
                question: "What is the default file extension?",
                options: [".pptx", ".ppt", ".ppsx", ".pdf"],
                answer: 0,
                explanation: ".pptx is the default extension for PowerPoint 2007 and later."
            }
        ]
    },
    photoshop: {
        "Paper 1": [
            {
                question: "Which tool is used to make a selection in the shape of a circle or rectangle?",
                options: ["Marquee Tool", "Lasso Tool", "Magic Wand", "Quick Selection"],
                answer: 0,
                explanation: "The Marquee Tool is used to make geometric selections like circles and rectangles."
            },
            {
                question: "What does Ctrl + Z do?",
                options: ["Undo", "Redo", "Save", "Zoom"],
                answer: 0,
                explanation: "Ctrl + Z undoes the last action."
            },
            {
                question: "Which tool removes unwanted objects?",
                options: ["Clone Stamp", "Brush", "Eraser", "Pencil"],
                answer: 0,
                explanation: "Clone Stamp tool copies pixels to remove unwanted objects."
            },
            {
                question: "What is a Layer?",
                options: ["Separate image element", "File format", "Color mode", "Tool option"],
                answer: 0,
                explanation: "A layer is a separate image element that can be edited independently."
            },
            {
                question: "Which tool adjusts brightness and contrast?",
                options: ["Levels", "Brush", "Crop", "Text"],
                answer: 0,
                explanation: "Levels adjusts the brightness and contrast of an image."
            }
        ],
        "Paper 2": [
            {
                question: "What is the shortcut for Free Transform?",
                options: ["Ctrl + T", "Ctrl + F", "Alt + T", "Shift + T"],
                answer: 0,
                explanation: "Ctrl + T activates Free Transform mode."
            },
            {
                question: "Which tool creates text?",
                options: ["Type Tool", "Brush Tool", "Pen Tool", "Shape Tool"],
                answer: 0,
                explanation: "Type Tool is used to create and edit text."
            },
            {
                question: "What does PSD stand for?",
                options: ["Photoshop Document", "Picture Standard Data", "Photo Shop Design", "Pixel Source Data"],
                answer: 0,
                explanation: "PSD stands for Photoshop Document."
            },
            {
                question: "Which color mode is best for web graphics?",
                options: ["RGB", "CMYK", "Grayscale", "LAB"],
                answer: 0,
                explanation: "RGB color mode is best for web and screen display."
            },
            {
                question: "What is the purpose of a Layer Mask?",
                options: ["Hide parts of layer", "Delete layer", "Merge layers", "Duplicate layer"],
                answer: 0,
                explanation: "Layer Mask hides parts of a layer without deleting them."
            }
        ]
    }
};

// Log that data is loaded
console.log('MCQ Data loaded successfully with subjects:', Object.keys(mcqData));