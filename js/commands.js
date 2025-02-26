var password = "primime";
var linkedin = "https://www.linkedin.com/in/nikola-savi%C4%87-10b8b9179/";
var github = "https://github.com/Dante983";
var email = "mailto:savicn209@gmail.com";

// Terminal settings and state
var terminalMode = "normal";
var currentDir = "~";
var fileSystem = {
  "~": {
    type: "directory",
    content: {
      "about.md": {
        type: "file",
        content: "# About Me\nHey, I'm Nikola! A passionate web developer with over four years of experience."
      },
      "projects": {
        type: "directory",
        content: {
          "readme.txt": {
            type: "file",
            content: "This directory contains information about my projects."
          }
        }
      },
      "skills.json": {
        type: "file",
        content: `{
  "languages": ["PHP", "JavaScript", "HTML", "CSS"],
  "frameworks": ["Laravel", "Angular", "React", "Node.js"],
  "databases": ["MySQL", "ClickHouse", "MongoDB"],
  "tools": ["Git", "RabbitMQ", "Redis"]
}`
      },
      "contact.txt": {
        type: "file",
        content: "Email: savicn209@gmail.com\nLinkedIn: https://www.linkedin.com/in/nikola-savić-10b8b9179/"
      },
      ".secret": {
        type: "directory",
        content: {
          "hint.txt": {
            type: "file",
            content: "The password might be hidden in plain sight... check the source code!"
          }
        }
      }
    }
  }
};

whois = [
  "<br>",
  "Hey, I'm Nikola!",
  "I am a passionate web developer with over four years of experience in creating efficient and user-friendly applications.",
  "My expertise lies in a range of technologies, with a strong proficiency in PHP and the Laravel framework,",
  "which enables me to build robust and scalable web applications.",
  "In addition to backend development, I excel in frontend technologies such as JavaScript, Angular.js, React.js, and Node.js,",
  "allowing me to craft interactive and responsive user interfaces that significantly enhance user experiences.",
  "I also have extensive experience with various databases including MySQL, ClickHouse, and MongoDB, ensuring that I can design",
  "and optimize efficient database structures to support application functionality and performance.",
  "Moreover, I have successfully integrated third-party services like RabbitMQ and Redis into projects to enhance real-time communication",
  "and data processing capabilities. My familiarity with Git facilitates smooth collaboration within development teams and efficient code management.",
  "Throughout my career, I have been dedicated to continuous learning and improvement, always striving to stay updated with the latest",
  "technologies and best practices in the industry.",
  "My journey as a developer has been driven by a passion for innovation and a commitment to delivering high-quality solutions.",
  "I look forward to the opportunity to bring my expertise and enthusiasm to new and exciting projects.",
  "<br>",
];

whoami = [
  "<br>",
  "The paradox of Who am I? is: we never know, but, we constantly find out.",
  "<br>",
];

social = [
  "<br>",
  'linkedin       <a href="' +
    linkedin +
    '" target="_blank">linkedin/SavicNikola' +
    "</a>",
  'github         <a href="' +
    github +
    '" target="_blank">github/SavicNikola (aka Dante983)' +
    "</a>",
  "<br>",
];

secret = [
  "<br>",
  '<span class="command">sudo</span>           Only use if you\'re admin',
  '<span class="command">vim</span>            Open Neovim-like editor',
  '<span class="command">cat .config/motd</span>      Display a motivational message',
  '<span class="command">find / -name "easter"</span> Find all Easter eggs',
  "<br>",
];

projects = [
  "<br>",
  '<div class="tmux-pane">',
  '<div class="neovim-status"><span class="mode">NORMAL</span><span class="file-info">projects.md [+]</span></div>',
  '<ul id="projects-list">',
  "  <li>",
  '    <h2><a href="https://github.com/Dante983/vp-band" target="_blank">Vizantijsko Plavo Band</a></h2>',
  "    <p>A website that was used for musical band where focus was to have a calendar",
  " with that shows avaiabled dates for a show",
  " as well as an admin access where you can add/remove/edit events.</p>",
  "    <p>Technologies: Node.js, HTML, CSS, MongoDB</p>",
  "  </li>",
  "  <li>",
  '    <h2><a href="https://github.com/Dante983/ai-image-gen" target="_blank">AI Image Generator</a></h2>',
  "    <p>This is a simple project created to test the openAI image generator.</p>",
  "    <p>Technologies: Node.js, HTML, CSS</p>",
  "  </li>",
  "  <li>",
  '    <h2><a href="https://login.performcb.com/" target="_blank">Perform[CB]</a></h2>',
  "    <p>This is an AdTech platform that I work on every day as my main job.</p>",
  "    <p>Technologies: PHP/Laravel, MySQL, MongoDB, Clickhouse, AngularJS, ReactJS, Redis, RabbitMQ</p>",
  "  </li>",
  "</ul>",
  "</div>",
];

help = [
  "<br>",
  '<span class="command">whois</span>          Who is Nikola?',
  '<span class="command">whoami</span>         Who are you?',
  '<span class="command">social</span>         Display social networks',
  '<span class="command">secret</span>         Find the password',
  '<span class="command">projects</span>       View coding projects',
  '<span class="command">skills</span>         List my technical skills',
  '<span class="command">history</span>        View command history',
  '<span class="command">help</span>           You obviously already know what this does',
  '<span class="command">email</span>          Email me',
  '<span class="command">clear</span>          Clear terminal',
  '<span class="command">banner</span>         Display the header',
  "<br>",
  '<span class="white">Unix-like commands:</span>',
  '<span class="command">ls</span>             List directory contents',
  '<span class="command">cd [dir]</span>       Change directory',
  '<span class="command">cat [file]</span>     Show file contents',
  '<span class="command">pwd</span>            Print working directory',
  '<span class="command">vim [file]</span>     Edit a file (simulation)',
  '<span class="command">date</span>           Display current date and time',
  '<span class="command">echo [text]</span>    Print text',
  '<span class="command">man [command]</span>  Display manual for command',
  '<span class="command">find [pattern]</span> Search for easter eggs',
  '<span class="command">neofetch</span>       Display system info',
  "<br>",
  '<span class="white">Try finding all the easter eggs!</span>',
  "<br>",
];

neofetch = [
  "<br>",
  '<span class="color2">                    ..,</span>',
  '<span class="color2">                  .::::</span>           <span class="white">visitor@nikolasavic</span>',
  '<span class="color2">                 ::::::                  ---------------</span>',
  '<span class="color2">                 ::::::                  </span><span class="white">OS:</span> <span class="color2">Portfolio Terminal OS</span>',
  '<span class="color2">                :::::::                  </span><span class="white">Host:</span> <span class="color2">GitHub Pages</span>',
  '<span class="color2">               ,::::::\'                  </span><span class="white">Kernel:</span> <span class="color2">JavaScript 1.0.0</span>',
  '<span class="color2">              .:::::::                   </span><span class="white">Uptime:</span> <span class="color2">Since 2023</span>',
  '<span class="color2">              ::::::::                   </span><span class="white">Packages:</span> <span class="color2">npm 42</span>',
  '<span class="color2">             :::::::.                    </span><span class="white">Shell:</span> <span class="color2">terminal.js</span>',
  '<span class="color2">             :::::::                     </span><span class="white">Resolution:</span> <span class="color2">Responsive x Adaptive</span>',
  '<span class="color2">            ::::::.                      </span><span class="white">DE:</span> <span class="color2">JavaScript</span>',
  '<span class="color2">            :::::::                      </span><span class="white">WM:</span> <span class="color2">CSS</span>',
  '<span class="color2">           ::::::::                      </span><span class="white">Terminal:</span> <span class="color2">nikolasavic-term</span>',
  '<span class="color2">           :::::::::                     </span><span class="white">CPU:</span> <span class="color2">Web Worker</span>',
  '<span class="color2">           :::::::::                     </span><span class="white">Memory:</span> <span class="color2">128MB / 2GB</span>',
  '<span class="color2">           ::::::::::                    </span>',
  '<span class="color2">           :::::::::::                   </span><span class="color2">███</span><span class="error">███</span><span class="warning">███</span><span class="success">███</span><span class="white">███</span><span class="command">███</span><span class="inherit">███</span>',
  '<span class="color2">           .:::::::::::</span>',
  '<span class="color2">            ::::::::::::</span>',
  '<span class="color2">             .:::::::::::</span>',
  "<br>",
];

skills = [
  "<br>",
  '<div class="tmux-pane">',
  "  <p><b>Languages:</b></p>",
  "  <div class='margin'>",
  "    <p>PHP       ████████████████████ 100%</p>",
  "    <p>JavaScript ██████████████████  90%</p>",
  "    <p>HTML/CSS  ████████████████     80%</p>",
  "    <p>SQL       ██████████████       70%</p>",
  "  </div>",
  "  <p><b>Frameworks:</b></p>",
  "  <div class='margin'>",
  "    <p>Laravel   ████████████████████ 100%</p>",
  "    <p>Angular   ████████████████     80%</p>",
  "    <p>React     ██████████████       70%</p>",
  "    <p>Node.js   ███████████          55%</p>",
  "  </div>",
  "  <p><b>Databases:</b></p>",
  "  <div class='margin'>",
  "    <p>MySQL     ████████████████████ 100%</p>",
  "    <p>MongoDB   ██████████████       70%</p>",
  "    <p>ClickHouse ████████████         60%</p>",
  "  </div>",
  "  <p><b>Tools:</b></p>",
  "  <div class='margin'>",
  "    <p>Git       ████████████████████ 100%</p>",
  "    <p>RabbitMQ  ████████████████     80%</p>",
  "    <p>Redis     ██████████████       70%</p>",
  "  </div>",
  "</div>",
  "<br>",
];

banner = [
  '<span class="index">Welcome to my terminal inspired webpage!',
  "",
  '<span class="success">███╗   ██╗██╗██╗  ██╗ ██████╗ ██╗      █████╗     ███████╗ █████╗ ██╗   ██╗██╗ ██████╗</span>',
  '<span class="success">████╗  ██║██║██║ ██╔╝██╔═══██╗██║     ██╔══██╗    ██╔════╝██╔══██╗██║   ██║██║██╔════╝</span>',
  '<span class="success">██╔██╗ ██║██║█████╔╝ ██║   ██║██║     ███████║    ███████╗███████║██║   ██║██║██║     </span>',
  '<span class="success">██║╚██╗██║██║██╔═██╗ ██║   ██║██║     ██╔══██║    ╚════██║██╔══██║╚██╗ ██╔╝██║██║     </span>',
  '<span class="success">██║ ╚████║██║██║  ██╗╚██████╔╝███████╗██║  ██║    ███████║██║  ██║ ╚████╔╝ ██║╚██████╗</span>',
  '<span class="success">╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝    ╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚═╝ ╚═════╝</span>',
  '<span class="index">v1.0.0 - Web Developer Terminal</span>',
  "<br> ",
  '<span class="color2">Welcome to my interactive web terminal.</span>',
  '<span class="color2">Type</span> <span class="command">\'help\'</span><span class="color2"> to see available commands.</span>',
  '<span class="warning">Try to find all the easter eggs!</span>',
];

motd = [
  "<br>",
  '<span class="success">Today\'s Motivational Message:</span>',
  '<span class="white">"Code is like humor. When you have to explain it, it\'s bad."</span>',
  '<span class="inherit">– Cory House</span>',
  "<br>",
];

manPages = {
  "help": [
    "<br>",
    '<span class="command">HELP(1)</span>                   User Commands                   <span class="command">HELP(1)</span>',
    "<br>",
    '<span class="white">NAME</span>',
    '       help - display information about available commands',
    "<br>",
    '<span class="white">SYNOPSIS</span>',
    '       <span class="command">help</span> [command]',
    "<br>",
    '<span class="white">DESCRIPTION</span>',
    '       Displays helpful information about the terminal commands.',
    "<br>",
    '<span class="white">AUTHOR</span>',
    '       Written by Nikola Savic.',
    "<br>",
  ],
  "ls": [
    "<br>",
    '<span class="command">LS(1)</span>                   User Commands                   <span class="command">LS(1)</span>',
    "<br>",
    '<span class="white">NAME</span>',
    '       ls - list directory contents',
    "<br>",
    '<span class="white">SYNOPSIS</span>',
    '       <span class="command">ls</span> [OPTION]... [FILE]...',
    "<br>",
    '<span class="white">DESCRIPTION</span>',
    '       List information about the FILEs (the current directory by default)',
    "<br>",
    '<span class="white">OPTIONS</span>',
    '       <span class="command">-a, --all</span>',
    '              do not ignore entries starting with .',
    "<br>",
    '<span class="white">AUTHOR</span>',
    '       Written by Nikola Savic.',
    "<br>",
  ]
};

// Easter eggs
var easterEggs = {
  "konami": {
    found: false,
    reward: "You've unlocked the Konami code easter egg! Here's a shooting stars effect!"
  },
  "matrix": {
    found: false,
    reward: "Matrix mode activated! Watch the digital rain..."
  },
  "nyancat": {
    found: false,
    reward: "NYAN CAT MODE ACTIVATED!"
  }
};

// Custom commands for the terminal
function getDirectoryContents(path, showHidden = false) {
  const parts = path.split('/').filter(p => p);
  let current = fileSystem["~"];
  
  // Special case for root path
  if (path === "/" || path === "") {
    return { "~": { type: "directory" } };
  }
  
  // Navigate to the specified path
  for (const part of parts) {
    if (part === "~") continue;
    if (!current.content || !current.content[part] || current.content[part].type !== "directory") {
      return null;
    }
    current = current.content[part];
  }
  
  let result = [];
  
  // List contents
  if (current && current.content) {
    for (const [name, item] of Object.entries(current.content)) {
      if (name.startsWith('.') && !showHidden) continue;
      
      if (item.type === "directory") {
        result.push(`<span class="color2">${name}/</span>`);
      } else {
        result.push(`<span class="white">${name}</span>`);
      }
    }
  }
  
  return result.sort();
}

function getFileContent(path) {
  const parts = path.split('/').filter(p => p);
  let current = fileSystem["~"];
  
  // Navigate to the specified directory
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (part === "~") continue;
    if (!current.content || !current.content[part] || current.content[part].type !== "directory") {
      return null;
    }
    current = current.content[part];
  }
  
  // Get the file
  const fileName = parts[parts.length - 1];
  if (!current.content || !current.content[fileName] || current.content[fileName].type !== "file") {
    return null;
  }
  
  return current.content[fileName].content;
}

function formatDate() {
  const date = new Date();
  return date.toLocaleString();
}

// Add these at the end of commands.js

// Define the banner
var banner = [
  '<span class="index">Welcome to my terminal inspired webpage!',
  "",
  '<span class="success">███╗   ██╗██╗██╗  ██╗ ██████╗ ██╗      █████╗     ███████╗ █████╗ ██╗   ██╗██╗ ██████╗</span>',
  '<span class="success">████╗  ██║██║██║ ██╔╝██╔═══██╗██║     ██╔══██╗    ██╔════╝██╔══██╗██║   ██║██║██╔════╝</span>',
  '<span class="success">██╔██╗ ██║██║█████╔╝ ██║   ██║██║     ███████║    ███████╗███████║██║   ██║██║██║     </span>',
  '<span class="success">██║╚██╗██║██║██╔═██╗ ██║   ██║██║     ██╔══██║    ╚════██║██╔══██║╚██╗ ██╔╝██║██║     </span>',
  '<span class="success">██║ ╚████║██║██║  ██╗╚██████╔╝███████╗██║  ██║    ███████║██║  ██║ ╚████╔╝ ██║╚██████╗</span>',
  '<span class="success">╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝    ╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚═╝ ╚═════╝</span>',
  '<span class="index">v1.0.0 - Web Developer Terminal</span>',
  "<br> ",
  '<span class="color2">Welcome to my interactive web terminal.</span>',
  '<span class="color2">Type</span> <span class="command">\'help\'</span><span class="color2"> to see available commands.</span>',
  '<span class="warning">Try to find all the easter eggs!</span>',
];

// Define motd message
var motd = [
  "<br>",
  '<span class="color2">Welcome to Nikola\'s Terminal</span>',
  '<span class="color2">Message of the day: Keep coding and exploring!</span>',
  "<br>"
];

// Define YouTube variable
var youtube = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

// Define Easter Eggs
var easterEggs = {
  "konami": {
    found: false,
    reward: "You've activated the Konami Code! Here come the shooting stars!"
  },
  "matrix": {
    found: false,
    reward: "Matrix mode activated! The digital rain begins..."
  },
  "nyancat": {
    found: false,
    reward: "Nyan Cat has appeared!"
  }
};

// Define manual pages
var manPages = {
  "ls": [
    "<br>",
    "<span class='command'>ls</span> - list directory contents",
    "<br>",
    "<span class='white'>Usage: ls [OPTION]... [FILE]...</span>",
    "<span class='white'>List information about the FILEs (the current directory by default).</span>",
    "<br>",
    "<span class='white'>Options:</span>",
    "<span class='white'>  -a, --all             do not ignore entries starting with .</span>",
    "<br>"
  ],
  "cd": [
    "<br>",
    "<span class='command'>cd</span> - change the working directory",
    "<br>",
    "<span class='white'>Usage: cd [directory]</span>",
    "<span class='white'>Change the current directory to the specified directory.</span>",
    "<span class='white'>If no directory is specified, changes to the home directory.</span>",
    "<br>"
  ],
  "cat": [
    "<br>",
    "<span class='command'>cat</span> - concatenate files and print on the standard output",
    "<br>",
    "<span class='white'>Usage: cat [FILE]...</span>",
    "<span class='white'>Concatenate FILE(s) to standard output.</span>",
    "<br>"
  ]
};

// Helper function to format date
function formatDate() {
  const now = new Date();
  return now.toLocaleString();
}
