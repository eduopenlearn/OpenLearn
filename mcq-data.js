// MCQ Data Structure
const mcqData = {
    msword: {
        "ප්‍රශ්න පත්‍ර අංක 01": [
            {
                question: "1. MS Word යනු:",
                options: ["මෙහෙයුම් පද්ධතියකි.", "වදන් සැකසුම් මෘදුකාංගයකී.", "දත්ත සමුදායක මෘදුකාංගයකි.", "Spreadsheet මෘදුකාංගයකි."],
                answer: 1,
                explanation: "MS Word යනු වදන් සැකසුම් මෘදුකාංගයකි."
            },
            {
                question: "2. MS Word 2016/2019 හි default file extension කුමක්ද?",
                options: [ ".txt", ".xls", ".docx", ".ppt"],
                answer: 2,
                explanation: "MS Word හී default file extension .docx වේ."
            },
            {
                question: "03. Copy කිරීමේ Shortcut key එක කුමක්ද?",
                options: ["Ctrl + X", "Ctrl + P", "Ctrl + C", "Ctrl + A"],
                answer: 2,
                explanation: "Ctrl + C යනු MS Word හි Copy කිරීමට ඇති යතුරුපුවරු කෙටිමගයි."
            },
            {
                question: "04. MS Word ගොනුවක් නව නමකින් සුරැකීම සඳහා පහත දෑ අතුරින් කුමක් භාවිතා කරයිද?",
                options: ["Save", "Save As", "Open", "Close"],
                answer: 1,
                explanation: "MS Word ගොනුවක් නව නමකින් සුරැකීම සඳහා Save As විකල්පය භාවිතා කරනු ලැබේ."
            },
            {
                question: "05. Undo කිරීමේ Shortcut key එක කුමක්ද?",
                options: ["Ctrl + Y", "Ctrl + U", "Ctrl + Z", "Ctrl + P"],
                answer: 2,
                explanation: "Ctrl + Z යනු MS Word හි Undo කිරීමට ඇති යතුරුපුවරු කෙටිමගයි."
            },
            {
                question: "06. Center alignment කිරීමේ Shortcut key එක කුමක්ද?",
                options: ["Ctrl + L", "Ctrl + E", "Ctrl + R", "Ctrl + J"],
                answer: 1,
                explanation: "Ctrl + E යනු MS Word හි Center alignment කිරීමට ඇති යතුරුපුවරු කෙටිමගයි."
            },
            {
                question: "07. MS Word මෘදුකාංගය වැඩි වශයෙන් භාවිතා වන්නේ ?",
                options: ["පරිගණක ක්‍රීඩා සඳහා", "වීඩියෝ නැරඹීම සඳහා", "ලේඛණ සංස්කරණය සඳහා", "වෙබ් අඩවි සැකසීම සඳහා"],
                answer: 2,
                explanation: "MS Word මෘදුකාංගය ලේඛණ සංස්කරණය සඳාහා යොදා ගන්නා මෘදුකාංගයකී."
            },
            {
                question: "08. Text තද පැහැ ගැන්වීම (Bold) කිරීම සඳහා __________ භාවිතා වේ.",
                options: ["Ctrl + U", "Ctrl + B", "Ctrl + I", "Ctrl + P"],
                answer: 1,
                explanation: "Ctrl + B යනු Text තද පැහැ ගැන්වීම සඳහා යොදා ගන්නා යතුරුපුවරු කෙටිමග වේ."
            },
            {
                question: "09. Font group කුමන Tab කාණ්ඩයට අයත් වේද?",
                options: ["Home", "Insert", "View", "Design"],
                answer: 0,
                explanation: "MS Word මෘදුකාංගය ලේඛණ සංස්කරණය සඳාහා යොදා ගන්නා මෘදුකාංගයකී."
            },
            {
                question: "10. Document එකක් Print කිරීමට shortcut key එක කුමක්ද?",
                options: ["Ctrl + S", "Ctrl + O", "Ctrl + F", "Ctrl + P"],
                answer: 3,
                explanation: "Ctrl + P යනු MS Word හි Document Print කිරීමට ඇති යතුරුපුවරු කෙටිමගයි."
            },
            
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
        
    },
    msaccess: {
       
    },
    mspowerpoint: {
        
    },
    photoshop: {
        
    }
};

// Log that data is loaded
console.log('MCQ Data loaded successfully with subjects:', Object.keys(mcqData));