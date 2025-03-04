var before = document.getElementById("before");
var liner = document.getElementById("liner");
var command = document.getElementById("typer");
var textarea = document.getElementById("texter");
var terminal = document.getElementById("terminal");
var terminalContent = document.getElementById("terminal-content");

var git = 0;
var pw = false;
let pwd = false;
var commands = [];
var currentPath = "~";

// Easter egg tracking
var konamiIndex = 0;
var konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // up up down down left right left right B A

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
            content: `# My Projects Portfolio

## Active Projects

### 0. WebShop (PHP/Laravel)
An e-commerce platform for selling digital and physical products

- Laravel application with blade frontend
- Advanced product search and filtering
- Order processing and inventory management
- Integrated payment gateway
- Admin panel for managing products and orders
- Mysql database with Redis caching
- Repository: github.com/Dante983/webshop

### 1. Snippetbox (Go)
A secure web application for creating and sharing text snippets

- Built with Go and MySQL
- Features user authentication and session management
- Clean architecture with MVC pattern
- Secure password hashing and CSRF protection
- Repository: github.com/Dante983/snippetbox

### 2. Pet Shop v2 (PHP/Laravel)
Modern pet shop management system

- Full-stack Laravel application
- Advanced inventory tracking system
- Customer relationship management
- Order processing and fulfillment
- Integrated payment gateway
- Repository: github.com/Dante983/pet-shop-v2

### 3. Portfolio Terminal (JavaScript)
Interactive terminal-based portfolio website

- Custom terminal emulator in JavaScript
- Unix-like command system
- Easter eggs and animations
- Responsive design
- Repository: github.com/Dante983/portfolio

### 4. Greenlight (Go)
RESTful JSON API for movie management

- Built with Go
- PostgreSQL database
- JWT authentication
- Rate limiting
- Comprehensive API documentation
- Repository: github.com/Dante983/greenlight

### 5. Neovim Config (Lua)
Personalized development environment

- Custom Neovim configuration
- LSP integration
- Telescope fuzzy finder
- Custom keybindings
- Git integration
- Repository: github.com/Dante983/nvim

## Tech Stack Used

- Languages: Go, PHP, JavaScript, Lua
- Frameworks: Laravel, React, Vue.js
- Databases: MySQL, PostgreSQL, MongoDB
- Tools: Docker, Git, Redis, RabbitMQ

## Future Projects

- Developing a personal knowledge management system
- Building a webshop for digital products
- Creating a social media platform for developers

For more information about my projects, visit:
              github.com / Dante983`
          }
        }
      },
      "skills.json": {
        type: "file",
        content: `{
    "languages": ["PHP", "JavaScript", "Python", "Go"],
    "frameworks": ["Laravel", "React.js", "Node.js", "Vue.js"],
    "databases": ["MySQL", "ClickHouse", "MongoDB"],
    "tools": ["Git", "RabbitMQ", "Redis", "Docker"]
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

setTimeout(function() {
  loopLines(banner, "", 80);
  textarea.focus();
}, 100);

var texter = document.getElementById("texter");
texter.addEventListener("blur", function() {
  setTimeout(function() {
    texter.focus();
  }, 0);
});

window.addEventListener("keyup", enterKey);
window.addEventListener("keydown", checkKonami);

// Terminal tabs functionality
var terminalTabs = document.querySelectorAll('.terminal-tab');
terminalTabs.forEach(tab => {
  tab.addEventListener('click', function() {
    terminalTabs.forEach(t => t.classList.remove('active'));
    this.classList.add('active');

    // Set mode based on file extension
    const fileName = this.textContent;
    if (fileName.endsWith('.sh')) {
      document.querySelector('.statusline-item.mode').textContent = "NORMAL";
      document.querySelector('.statusline-item:last-child').textContent = "Shell";
    } else if (fileName.endsWith('.js')) {
      document.querySelector('.statusline-item.mode').textContent = "INSERT";
      document.querySelector('.statusline-item:last-child').textContent = "JavaScript";
    } else if (fileName.endsWith('.md')) {
      document.querySelector('.statusline-item.mode').textContent = "VISUAL";
      document.querySelector('.statusline-item:last-child').textContent = "Markdown";
    }
  });
});

// Terminal controls
document.querySelector('.terminal-control.close').addEventListener('click', function() {
  if (confirm("Close terminal?")) {
    addLine("Terminal session closed. Refresh to restart.", "error", 0);
    document.querySelector('#command').style.display = 'none';
  }
});

document.querySelector('.terminal-control.minimize').addEventListener('click', function() {
  document.querySelector('.terminal').classList.toggle('minimized');
});

document.querySelector('.terminal-control.maximize').addEventListener('click', function() {
  document.querySelector('.terminal-container').classList.toggle('fullscreen');
});

// Make sure terminal scrolls to bottom on new content
function scrollToBottom() {
  terminalContent.scrollTop = terminalContent.scrollHeight;
}

// Check for Konami code
function checkKonami(e) {
  if (e.keyCode === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      activateEasterEgg("konami");
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
}

// Activate Easter egg
// Modify the activateEasterEgg function to create more shooting stars
function activateEasterEgg(type) {
  if (easterEggs[type] && !easterEggs[type].found) {
    easterEggs[type].found = true;

    switch (type) {
      case "konami":
        addLine("<br>", "", 0);
        addLine(easterEggs[type].reward, "success", 0);

        // Create many more shooting stars with better positioning and timing
        const starCount = 30; // Increased from 10 to 30
        const duration = 6000; // Total duration of the effect in ms

        // Create stars in batches for a more natural effect
        for (let batch = 0; batch < 3; batch++) {
          setTimeout(() => {
            for (let i = 0; i < starCount / 3; i++) {
              setTimeout(() => {
                const star = document.createElement('div');
                star.className = 'shooting-star';

                // Randomize starting positions across the entire screen
                star.style.top = Math.random() * 80 + '%';
                star.style.left = Math.random() * 80 + '%';

                // Randomize size for more variety
                const size = 2 + Math.random() * 4;
                star.style.width = `${size} px`;
                star.style.height = `${size} px`;

                // Randomize animation duration for more natural movement
                const speed = 2 + Math.random() * 2;
                star.style.animationDuration = `${speed} s`;

                // Randomize animation direction
                const angle = Math.random() * 60 + 30; // Between 30 and 90 degrees
                star.style.transform = `rotate(${angle}deg)`;

                document.body.appendChild(star);

                // Remove star after animation completes
                setTimeout(() => {
                  if (star.parentNode) {
                    document.body.removeChild(star);
                  }
                }, speed * 1000);
              }, i * 100); // Stagger star creation within each batch
            }
          }, batch * 1500); // Stagger batches
        }
        break;

      case "matrix":
        addLine("<br>", "", 0);
        addLine(easterEggs[type].reward, "success", 0);

        // Create Matrix rain container with initial opacity 0
        const matrixRain = document.createElement('div');
        matrixRain.className = 'matrix-rain';
        matrixRain.style.opacity = '0';
        document.body.appendChild(matrixRain);

        // Fade in the matrix effect
        setTimeout(() => {
          matrixRain.style.transition = 'opacity 1s ease-in';
          matrixRain.style.opacity = '1';
        }, 100);

        // Create Matrix columns
        const characters = "日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍｦｲｸｺｿﾁﾄﾉﾌﾔﾖﾙﾚﾛﾝ1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const columns = Math.floor(window.innerWidth / 30);

        for (let i = 0; i < columns; i++) {
          const column = document.createElement('div');
          column.className = 'matrix-column';
          column.style.left = (i * 30) + 'px';

          // Random speed and delay for each column
          const speed = 3 + Math.random() * 5;
          const delay = Math.random() * 2;
          column.style.animationDuration = speed + 's';
          column.style.animationDelay = delay + 's';

          // Fill column with random characters
          const columnHeight = Math.floor(Math.random() * 15) + 10;
          let columnContent = '';

          for (let j = 0; j < columnHeight; j++) {
            const char = characters.charAt(Math.floor(Math.random() * characters.length));
            const opacity = (1 - (j / columnHeight)) * 0.8 + 0.2;
            columnContent += `< span style = "opacity: ${opacity}" > ${char}</span > <br>`;
          }

          column.innerHTML = columnContent;
          matrixRain.appendChild(column);
        }

        // Fade out and remove Matrix effect after a few seconds
        setTimeout(() => {
          matrixRain.style.transition = 'opacity 1.5s ease-out';
          matrixRain.style.opacity = '0';

          // Remove from DOM after fade out completes
          setTimeout(() => {
            if (matrixRain.parentNode) {
              document.body.removeChild(matrixRain);
            }
          }, 1500);
        }, 6500); // Start fade out after 6.5 seconds
        break;

      case "nyancat":
        addLine("<br>", "", 0);
        addLine(easterEggs[type].reward, "success", 0);

        const nyanCat = document.createElement('div');
        nyanCat.className = 'nyan-cat';
        nyanCat.innerHTML = `
    <div class="cat-container">
      <div class="rainbow"></div>
      <div class="cat-image"></div>
    </div>
    `;
        document.body.appendChild(nyanCat);

        setTimeout(() => {
          if (nyanCat.parentNode) {
            document.body.removeChild(nyanCat);
          }
        }, 8000);
        break;
    }
  }
}

// Unix-like command handler
function handleUnixCommand(cmd, args) {
  switch (cmd) {
    case 'ls':
      const showHidden = args.includes('-a') || args.includes('--all');
      const path = args.filter(arg => !arg.startsWith('-')).pop() || currentPath;
      const contents = getDirectoryContents(path, showHidden);

      if (!contents) {
        return [`<span class="error">ls: cannot access '${path}': No such file or directory</span>`];
      }

      return ["<br>", ...contents, "<br>"];

    case 'cd':
      const newPath = args[0] || "~";

      if (newPath === "..") {
        const pathParts = currentPath.split('/');
        if (pathParts.length > 1) {
          pathParts.pop();
          currentPath = pathParts.join('/') || "~";
        }
        return [`<span class="success">Changed directory to ${currentPath}</span>`];
      }

      // Handle absolute paths
      const targetPath = newPath.startsWith('/') || newPath.startsWith('~')
        ? newPath
        : `${currentPath === '~' ? '' : currentPath}/${newPath}`;

      const dir = getDirectoryContents(targetPath);
      if (!dir) {
        return [`<span class="error">cd: no such directory: ${newPath}</span>`];
      }

      currentPath = targetPath;
      return [`<span class="success">Changed directory to ${currentPath}</span>`];

    case 'pwd':
      return [`<span class="white">${currentPath}</span>`];

    case 'cat':
      if (!args.length) {
        return [`<span class="error">cat: missing file operand</span>`];
      }

      const filePath = args[0].startsWith('/') || args[0].startsWith('~')
        ? args[0]
        : `${currentPath === '~' ? '' : currentPath}/${args[0]}`;

      const content = getFileContent(filePath);
      if (!content) {
        return [`<span class="error">cat: ${args[0]}: No such file</span>`];
      }

      return ["<br>", `<div class="file-content">${content}</div>`, "<br>"];

    case 'date':
      return [`<span class="white">${formatDate()}</span>`];

    case 'echo':
      return [args.join(' ')];

    case 'man':
      if (!args.length) {
        return [`<span class="error">What manual page do you want?</span>`];
      }

      const command = args[0];
      if (manPages[command]) {
        return manPages[command];
      } else {
        return [`<span class="error">No manual entry for ${command}</span>`];
      }

    case 'vim':
      return [
        "<br>",
        '<span class="white">Opening Neovim...</span>',
        '<div class="vim-container">',
        '<div class="vim-header"><span class="vim-mode">NORMAL</span><span class="vim-filename">~/' + args[0] + ' [+]</span></div>',
        '<div class="vim-content">',
        '<div class="vim-line"><span class="vim-line-number">1</span><span class="vim-line-content"></span></div>',
        '<div class="vim-line"><span class="vim-line-number">2</span><span class="vim-line-content"></span></div>',
        '<div class="vim-line"><span class="vim-line-number">3</span><span class="vim-line-content"></span></div>',
        '<div class="vim-line"><span class="vim-line-number">4</span><span class="vim-line-content"></span></div>',
        '<div class="vim-line"><span class="vim-line-number">5</span><span class="vim-line-content"></span></div>',
        '<div class="vim-line"><span class="vim-line-number">6</span><span class="vim-line-content">~</span></div>',
        '<div class="vim-line"><span class="vim-line-number">7</span><span class="vim-line-content">~</span></div>',
        '<div class="vim-line"><span class="vim-line-number">8</span><span class="vim-line-content">~ "' + (args[0] || 'untitled') + '" [New File]</span></div>',
        '</div>',
        '<div class="vim-footer"><span class="vim-status">"' + args[0] + '" [New] 0L, 0B</span></div>',
        '</div>',
        "<br>",
        '<span class="white">Simulated Neovim experience. Type any command to exit.</span>'
      ];

    case 'find':
      if (args.join(' ') === '/ -name "easter"') {
        activateEasterEgg("matrix");
        return ["<br>", '<span class="success">Searching for Easter eggs...</span>'];
      }
      return ["<br>", '<span class="white">No Easter eggs found in this location. Keep searching!</span>'];

    case 'neofetch':
      return neofetch;

    default:
      return [`<span class="error">Command not found: ${cmd}</span>`, "<br>", '<span class="white">Type "help" for available commands.</span>'];
  }
}

// Add this near the top of your file with other variable declarations
var password = "terminal"; // Define the password

// Fix the password handling in the processCommand function
function processCommand() {
  const val = command.innerHTML.trim();

  if (val.length === 0) {
    addLine("", "no-animation", 0);
    return;
  }

  // Save command to history
  commands.push(val);
  git = commands.length;

  // Special Easter Egg Commands
  if (val.toLowerCase() === "nyancat") {
    activateEasterEgg("nyancat");
    addLine("nyancat", "no-animation", 0);
    command.innerHTML = "";
    return;
  }

  addLine(`${val}`, "no-animation", 0);
  command.innerHTML = "";

  // Process main commands
  if (val.toLowerCase() === "clear" || val.toLowerCase() === "cls") {
    setTimeout(function() {
      terminal.innerHTML = '<a id="before"></a>';
      before = document.getElementById("before");
    }, 1);
    return;
  } else if (val.toLowerCase() === "banner") {
    loopLines(banner, "", 80);
    return;
  } else if (val.toLowerCase() === "help") {
    loopLines(help, "", 80);
    return;
  } else if (val.toLowerCase() === "whois") {
    loopLines(whois, "", 80);
    return;
  } else if (val.toLowerCase() === "whoami") {
    loopLines(whoami, "", 80);
    return;
  } else if (val.toLowerCase() === "video") {
    addLine("Opening YouTube...", "no-animation", 0);
    newTab(youtube);
    return;
  } else if (val.toLowerCase() === "sudo") {
    addLine("Oh no, you're not admin...", "error", 100);
    setTimeout(function() {
      window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    }, 1000);
    return;
  } else if (val.toLowerCase() === "social") {
    loopLines(social, "", 80);
    return;
  } else if (val.toLowerCase() === "secret") {
    loopLines(secret, "", 80);
    return;
  } else if (val.toLowerCase() === "projects") {
    loopLines(projects, "", 80);
    return;
  } else if (val.toLowerCase() === "skills") {
    loopLines(skills, "", 80);
    return;
  } else if (val.toLowerCase() === "password") {
    addLine("Initiating password prompt...", "no-animation", 0);
    setTimeout(function() {
      pw = true;
      liner.classList.add("password");
      command.innerHTML = "";
      addLine("Enter password:", "no-animation", 0);
    }, 1000);
    return;
  } else if (val.toLowerCase() === "history") {
    addLine("<br>", "", 0);
    loopLines(commands, "command", 80);
    addLine("<br>", "command", 80 * commands.length + 50);
    return;
  } else if (val.toLowerCase() === "email") {
    addLine('Opening mailto:<a href="mailto:savicn209@gmail.com">savicn209@gmail.com</a>...', "no-animation", 0);
    newTab(email);
    return;
  } else if (val.startsWith("cat ") && val.toLowerCase().includes(".config/motd")) {
    loopLines(motd, "", 80);
    return;
  }

  // Handle Unix-like commands
  const cmdParts = val.split(/\s+/);
  const cmd = cmdParts[0].toLowerCase();
  const args = cmdParts.slice(1);

  if (["ls", "cd", "pwd", "cat", "vim", "date", "echo", "man", "find", "neofetch"].includes(cmd)) {
    const response = handleUnixCommand(cmd, args);
    loopLines(response, "", 80);
    return;
  }

  // Default response
  addLine(`Command not recognized: ${val}`, "error", 100);
  addLine('Type "help" to see available commands', "white", 200);
}

// Fix the password handling with a completely different approach
function enterKey(e) {
  if (e.keyCode === 13) {
    // Enter key pressed
    e.preventDefault();

    if (pw) {
      // We're processing a password
      const enteredPassword = textarea.value.trim();
      console.log("Password entered:", enteredPassword); // Debug line

      if (enteredPassword === "terminal") {
        pw = false;
        liner.classList.remove("password");
        command.innerHTML = "";
        textarea.value = "";
        addLine("Access granted. Welcome!", "success", 0);

        // Show some "secret" content here
        setTimeout(function() {
          addLine("<br>", "", 0);
          addLine("Congratulations! You found a secret message!", "success", 0);
          addLine("Here's a hint for another easter egg: up up down down left right left right B A", "warning", 0);
          activateEasterEgg("matrix");
        }, 500);
      } else {
        addLine("Wrong password. Access denied.", "error", 0);
        addLine(`You entered: "${enteredPassword}"`, "error", 0); // Debug line
        command.innerHTML = "";
        textarea.value = "";
        pw = false;
        liner.classList.remove("password");
      }
    } else {
      // Normal command processing
      processCommand();

      // Clear both the command element and the textarea
      command.innerHTML = "";
      textarea.value = "";

      // Reset git pointer to the end of commands
      git = commands.length;

      scrollToBottom();
    }
  } else if (e.keyCode === 38 && !pw) {
    // Up arrow key - command history navigation
    if (git !== 0) {
      git -= 1;
      if (commands[git]) {
        command.innerHTML = commands[git];
        textarea.value = commands[git];
      }
    }
  } else if (e.keyCode === 40 && !pw) {
    // Down arrow key - command history navigation
    if (git !== commands.length) {
      git += 1;
      if (commands[git]) {
        command.innerHTML = commands[git];
        textarea.value = commands[git];
      } else {
        command.innerHTML = "";
        textarea.value = "";
      }
    }
  }
}

function newTab(link) {
  setTimeout(function() {
    window.open(link, "_blank");
  }, 500);
}

function addLine(text, style, time) {
  setTimeout(function() {
    const next = document.createElement("p");
    next.innerHTML = text;

    if (style) {
      next.className = style;
    }

    before.parentNode.insertBefore(next, before);
    scrollToBottom();
  }, time);
}

function loopLines(name, style, time) {
  name.forEach(function(item, index) {
    addLine(item, style, index * time);
  });
}

// CSS for easter eggs
function addEasterEggStyles() {
  const style = document.createElement('style');
  style.textContent = `
                    .shooting-star {
                      position: fixed;
                    width: 4px;
                    height: 4px;
                    background: white;
                    border-radius: 50%;
                    box-shadow: 0 0 10px 2px white, 0 0 20px 5px rgba(255, 255, 255, 0.5);
                    animation: shooting 3s linear;
                    z-index: 1000;
                    transform-origin: center;
    }

                    @keyframes shooting {
                      0 % {
                        transform: translate(0, 0) scale(0);
        opacity: 0;
                      }
      10% {
                      transform: translate(20px, 20px) scale(1);
                    opacity: 1;
      }
                    100% {
                      transform: translate(1500px, 1500px) scale(0.5);
                    opacity: 0;
      }
    }

                    .nyan-cat {
                      position: fixed;
                    bottom: 50px;
                    left: -150px;
                    animation: nyan 8s linear;
                    z-index: 1000;
    }

                    .cat-container {
                      position: relative;
                    width: 150px;
                    height: 100px;
    }

                    .cat-image {
                      width: 100px;
                    height: 60px;
                    background-color: #999;
                    border-radius: 10px;
                    position: relative;
                    z-index: 2;
                    background: #FE8;
                    position: relative;
    }

                    .cat-image:before, .cat-image:after {
                      content: '';
                    position: absolute;
                    background: #FE8;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    top: -10px;
    }

                    .cat-image:before {
                      left: 10px;
    }

                    .cat-image:after {
                      right: 10px;
    }

                    .rainbow {
                      height: 20px;
                    width: 150px;
                    background: linear-gradient(to bottom,
                    red 0%, red 16.6%,
                    orange 16.6%, orange 33.2%,
                    yellow 33.2%, yellow 49.8%,
                    green 49.8%, green 66.4%,
                    blue 66.4%, blue 83%,
                    violet 83%, violet 100%);
                    position: absolute;
                    top: 50%;
                    right: 90%;
                    transform: translateY(-50%);
                    z-index: 1;
    }

                    @keyframes nyan {
                      from {left: -150px; }
                    to {left: calc(100% + 150px); }
    }

                    .matrix-rain {
                      position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.9);
                    z-index: 9999;
                    overflow: hidden;
                    pointer-events: none;
                    /* Add transition property for smooth fade in/out */
                    transition: opacity 1s ease;
    }

                    .matrix-column {
                      position: absolute;
                    top: -100px;
                    width: 30px;
                    color: #0f0;
                    font-family: monospace;
                    font-size: 1.5em;
                    text-align: center;
                    opacity: 0;
                    animation: matrix-fall linear infinite;
    }

                    @keyframes matrix-fall {
                      0 % {
                        opacity: 0;
                        transform: translateY(-100px);
                      }
      10% {
                      opacity: 1;
      }
                    90% {
                      opacity: 1;
      }
                    100% {
                      opacity: 0;
                    transform: translateY(calc(100vh + 100px));
      }
    }
                    `;
  document.head.appendChild(style);
}

function getDirectoryContents(path, showHidden = false) {
  const parts = path.split('/').filter(p => p);
  let current = fileSystem["~"];

  // Special case for root path
  if (path === "/" || path === "") {
    return ["<span class='color2'>~</span>"];
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

  // Process the content to properly handle line breaks
  let content = current.content[fileName].content;

  // Replace all \n with proper HTML line breaks
  content = content.split('\n').map(line => {
    // Preserve indentation by replacing spaces with &nbsp;
    line = line.replace(/^\s+/, match => '&nbsp;'.repeat(match.length));
    return line;
  }).join('<br>');

  return content;
}

// Fix 1: Make sure the help variable and other command outputs are defined
var help = [
  "<br>",
  '<span class="command">help</span>            Show this help message',
  '<span class="command">ls</span>              List directory contents',
  '<span class="command">cd &lt;dir&gt;</span>          Change directory',
  '<span class="command">cat &lt;file&gt;</span>        Display file contents',
  '<span class="command">pwd</span>             Print working directory',
  '<span class="command">clear</span>           Clear the terminal',
  '<span class="command">banner</span>          Display the banner',
  '<span class="command">whois</span>           About me',
  '<span class="command">whoami</span>          About you',
  '<span class="command">social</span>          Display social links',
  '<span class="command">projects</span>        View my projects',
  '<span class="command">skills</span>          View my skills',
  '<span class="command">history</span>         Show command history',
  '<span class="command">password</span>        Enter password',
  '<span class="command">email</span>           Send me an email',
  '<span class="command">neofetch</span>        System information',
  '<span class="command">date</span>            Show current date',
  '<span class="command">echo &lt;msg&gt;</span>       Print message',
  '<span class="command">vim &lt;file&gt;</span>       Simulate vim editor',
  '<span class="command">sudo</span>            Run as superuser',
  "<br>"
];

// Define other command response variables
var banner = [
  '<span class="index">Welcome to my terminal inspired webpage!',
  "",
  '<span class="success">███╗   ██╗██╗██╗  ██╗ ██████╗ ██╗      █████╗     ███████╗ █████╗ ██╗   ██╗██╗ ██████╗</span>',
  '<span class="success">████╗  ██║██║██║ ██╔╝██╔═══██╗██║     ██╔══██╗    ██╔════╝██╔══██╗██║   ██║██║██╔════╝</span>',
  '<span class="success">██╔██╗ ██║██║█████╔╝ ██║   ██║██║     ███████║    ███████╗███████║██║   ██║██║██║     </span>',
  '<span class="success">██║╚██╗██║██║██╔═██╗ ██║   ██║██║     ██╔══██║    ╚════██║██╔══██║╚██╗ ██╔╝██║██║     </span>',
  '<span class="success">██║ ╚████║██║██║  ██╗╚██████╔╝███████╗██║  ██║    ███████║██║  ██║ ╚████╔╝ ██║╚██████╗</span>',
  '<span class="success">╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝    ╚══════╝╚═╝  ╚╝  ╚═══╝  ╚═╝ ╚═════╝</span>',
  '<span class="index">v1.0.0 - Web Developer Terminal</span>',
  "<br> ",
  '<span class="color2">Welcome to my interactive web terminal.</span>',
  '<span class="color2">Type</span> <span class="command">\'help\'</span><span class="color2"> to see available commands.</span>',
  '<span class="warning">Try to find all the easter eggs!</span>',
];

var whois = [
  "<br>",
  "<span class=\"color2\">Hey, I'm Nikola!</span>",
  "<span class=\"color2\">Web developer with a passion for building innovative solutions.</span>",
  "<span class=\"color2\">I specialize in full-stack development with PHP, JavaScript, and various frameworks.</span>",
  "<span class=\"color2\">When I'm not coding, I enjoy exploring new technologies and continuous learning.</span>",
  "<br>"
];

var whoami = [
  "<br>",
  "<span class=\"color2\">You are a visitor exploring my interactive terminal portfolio!</span>",
  "<span class=\"color2\">Feel free to look around and learn more about me and my work.</span>",
  "<br>"
];

var social = [
  "<br>",
  '<span class="color2">LinkedIn: </span><a href="https://www.linkedin.com/in/nikola-savić-10b8b9179/" target="_blank">linkedin.com/in/nikola-savić-10b8b9179</a>',
  '<span class="color2">GitHub: </span><a href="https://github.com/Dante983" target="_blank">github.com/Dante983</a>',
  "<br>"
];

var projects = [
  "<br>",
  '<span class="color2">Here are some of my featured projects:</span>',
  '<div class="project-card">',
  '  <span class="project-title">snippetbox</span> <span class="project-lang">Go</span>',
  '  <p class="project-desc">A secure web application for creating and sharing text snippets with user authentication and MySQL database integration.</p>',
  '  <p class="project-link"><a href="https://github.com/Dante983/snippetbox" target="_blank">github.com/Dante983/snippetbox</a></p>',
  '</div>',
  '<div class="project-card">',
  '  <span class="project-title">pet-shop-v2</span> <span class="project-lang">PHP</span>',
  '  <p class="project-desc">A modern pet shop management system with inventory tracking, customer management, and order processing features.</p>',
  '  <p class="project-link"><a href="https://github.com/Dante983/pet-shop-v2" target="_blank">github.com/Dante983/pet-shop-v2</a></p>',
  '</div>',
  '<div class="project-card">',
  '  <span class="project-title">portfolio</span> <span class="project-lang">JavaScript</span>',
  '  <p class="project-desc">This interactive terminal-based portfolio website showcasing my skills and projects.</p>',
  '  <p class="project-link"><a href="https://github.com/Dante983/portfolio" target="_blank">github.com/Dante983/portfolio</a></p>',
  '</div>',
  '<div class="project-card">',
  '  <span class="project-title">greenlight</span> <span class="project-lang">Go</span>',
  '  <p class="project-desc">Movie JSON API project with comprehensive endpoints for movie data management.</p>',
  '  <p class="project-link"><a href="https://github.com/Dante983/greenlight" target="_blank">github.com/Dante983/greenlight</a></p>',
  '</div>',
  '<div class="project-card">',
  '  <span class="project-title">nvim</span> <span class="project-lang">Lua</span>',
  '  <p class="project-desc">My personalized Neovim configuration for an optimized development workflow.</p>',
  '  <p class="project-link"><a href="https://github.com/Dante983/nvim" target="_blank">github.com/Dante983/nvim</a></p>',
  '</div>',
  "<br>",
  '<span class="color2">Type "cd projects" to explore more or visit <a href="https://github.com/Dante983" target="_blank">github.com/Dante983</a></span>',
  "<br>"
];

var skills = [
  "<br>",
  '<div class="tmux-pane">',
  "  <p><b>Languages:</b></p>",
  "  <div class='margin'>",
  "    <p>PHP       ████████████████████ 100%</p>",
  "    <p>JavaScript ██████████          55%</p>",
  "    <p>Go (Golang) ████████████       60%</p>",
  "    <p>HTML/CSS  ████████████████     80%</p>",
  // "    <p>SQL       ███████████████      75%</p>",
  "    <p>Lua       ███████████          50%</p>",
  "  </div>",
  "  <p><b>Frameworks:</b></p>",
  "  <div class='margin'>",
  "    <p>Laravel   ████████████████████ 100%</p>",
  "    <p>React     ██████████████       70%</p>",
  "    <p>Vue.js    ██████████           50%</p>",
  "    <p>Angular   ██████████           50%</p>",
  "    <p>Hyprland  ████████████         60%</p>",
  "  </div>",
  "  <p><b>Databases:</b></p>",
  "  <div class='margin'>",
  "    <p>MySQL     ████████████████████ 100%</p>",
  "    <p>PostgreSQL█████████████████    85%</p>",
  "    <p>MongoDB   ██████████████       70%</p>",
  "    <p>ClickHouse ████████████         60%</p>",
  // "    <p>Neo4j     ████████             40%</p>",
  "  </div>",
  "  <p><b>Tools:</b></p>",
  "  <div class='margin'>",
  "    <p>Git       ████████████████████ 100%</p>",
  "    <p>Redis     ██████████████       70%</p>",
  "    <p>Docker    ██████████████       70%</p>",
  "    <p>RabbitMQ  ████████████         60%</p>",
  "    <p>Kitty     ████████████         60%</p>",
  "    <p>Neovim    ███████████████      75%</p>",
  "  </div>",
  "</div>",
  "<br>",
];


var secret = [
  "<br>",
  '<span class="color2">You found a secret command!</span>',
  '<span class="color2">Here\'s a hint for another easter egg...</span>',
  "<br>"
];

var motd = [
  "<br>",
  '<span class="color2">Welcome to Nikola\'s Terminal</span>',
  '<span class="color2">Message of the day: Keep coding and exploring!</span>',
  "<br>"
];

var neofetch = [
  "<br>",
  '                                                                                <span class="white">visitor@nikolasavic</span>',
  '                                                                                <span class="white">------------------</span>',
  '                          <span class="color2">/\\</span>                                      <span class="white">OS: Web Terminal OS</span>',
  '                         <span class="color2">/  \\</span>                                     <span class="white">Host: JavaScript Browser</span>',
  '                        <span class="color2">/    \\</span>                                    <span class="white">Kernel: HTML5 + CSS3</span>',
  '                       <span class="color2">/      \\</span>                                   <span class="white">Uptime: Since you loaded the page</span>',
  '                      <span class="color2">/   /\\   \\</span>                                  <span class="white">Packages: 42 npm packages</span>',
  '                     <span class="color2">/   /  \\   \\</span>                                 <span class="white">Shell: Terminal.js</span>',
  '                    <span class="color2">/   /    \\   \\</span>                                <span class="white">Resolution: 1000x920</span>',
  '                   <span class="color2">/   /      \\   \\</span>                               <span class="white">DE: Web Browser</span>',
  '                  <span class="color2">/   /   __   \\   \\</span>                              <span class="white">WM: Document Object Model</span>',
  '                 <span class="color2">/   /   |  |   \\   \\</span>                             <span class="white">Terminal: JavaScript Console</span>',
  '                <span class="color2">/___/___/    \\___\\___\\</span>                            <span class="white">CPU: Browser Engine</span>',
  '               <span class="color2">/                       \\</span>                           <span class="white">Memory: As much as your browser allows</span>',
  "<br>"
];

// Define email and YouTube variables
var email = "mailto:savicn209@gmail.com";
var youtube = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

// Add Easter Eggs definitions
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

// Fix 2: Add this function to the end of your main.js file to adjust the terminal height and position
function adjustTerminalLayout() {
  // Make the terminal content take up more vertical space
  var terminalContent = document.getElementById("terminal-content");
  terminalContent.style.height = "calc(100vh - 150px)";
  terminalContent.style.minHeight = "300px";

  // Adjust the command line positioning
  var commandLine = document.getElementById("command");
  function addCustomStyles() {
    const style = document.createElement('style');
    style.textContent = `
                                                  /* File content styling */
                                                  .file-content {
                                                    white - space: pre-wrap;
                                                  font-family: monospace;
                                                  line-height: 1.4;
                                                  margin: 5px 0;
    }`
    setTimeout(scrollToBottom, 100);
  }

  // Call this function after the page loads
  window.addEventListener("load", adjustTerminalLayout);

  // Add these CSS rules for the vim simulation and better padding
  function addCustomStyles() {
    const style = document.createElement('style');
    style.textContent = `
                                                  /* Better command prompt padding */
                                                  #liner {
                                                    padding: 8px 0;
                                                  margin - bottom: 5px;
    }

                                                  #liner::before {
                                                    padding - right: 12px;
    }

                                                  /* Improved Vim styling */
                                                  .vim - container {
                                                    background - color: #1a1b26;
                                                  border: 1px solid #414868;
                                                  border - radius: 4px;
                                                  margin: 10px 0;
                                                  font - family: monospace;
                                                  overflow: hidden;
                                                  width: 100 %;
    }

                                                  .vim - header {
                                                    background - color: #24283b;
                                                  padding: 4px 8px;
                                                  display: flex;
                                                  justify - content: space - between;
                                                  border - bottom: 1px solid #414868;
    }

                                                  .vim - mode {
                                                    background - color: #bb9af7;
                                                  color: #1a1b26;
                                                  font - weight: bold;
                                                  padding: 0 5px;
                                                  border - radius: 3px;
    }

                                                  .vim - filename {
                                                    color: #c0caf5;
    }

                                                  .vim - content {
                                                    padding: 5px 0;
                                                  min - height: 180px;
    }

                                                  .vim - line {
                                                    display: flex;
                                                  padding: 1px 0;
    }

                                                  .vim - line - number {
                                                    color: #565f89;
                                                  width: 30px;
                                                  text - align: right;
                                                  padding - right: 8px;
                                                  user - select: none;
    }

                                                  .vim - line - content {
                                                    color: #c0caf5;
                                                  flex: 1;
    }

                                                  .vim - footer {
                                                    background - color: #24283b;
                                                  padding: 4px 8px;
                                                  border - top: 1px solid #414868;
                                                  color: #c0caf5;
                                                  font - size: 0.9em;
    }

                                                  .vim - status {
                                                    display: flex;
                                                  justify - content: space - between;
    }

                                                  /* Terminal padding and spacing fixes */
                                                  #terminal - content {
                                                    padding: 15px 20px!important;
    }

                                                  #command {
                                                    margin - top: 15px!important;
                                                  margin - bottom: 10px;
    }

                                                  /* Project card styling */
                                                  .project - card {
                                                    background - color: rgba(30, 30, 30, 0.6);
                                                  border - left: 3px solid #bb9af7;
                                                  margin: 10px 0;
                                                  padding: 10px 15px;
                                                  border - radius: 0 4px 4px 0;
                                                  transition: all 0.3s ease;
    }

                                                  .project - card:hover {
                                                    background - color: rgba(40, 40, 40, 0.8);
                                                  transform: translateX(5px);
    }

                                                  .project - title {
                                                    color: #7aa2f7;
                                                  font - weight: bold;
                                                  font - size: 1.1em;
    }

                                                  .project - lang {
                                                    background - color: #414868;
                                                  color: #c0caf5;
                                                  padding: 2px 6px;
                                                  border - radius: 3px;
                                                  font - size: 0.8em;
                                                  margin - left: 8px;
    }

                                                  .project - desc {
                                                    color: #a9b1d6;
                                                  margin: 5px 0;
                                                  font - size: 0.95em;
    }

                                                  .project - link a {
                                                    color: #9ece6a;
                                                  text - decoration: none;
                                                  font - size: 0.9em;
    }

                                                  .project - link a:hover {
                                                    text - decoration: underline;
    }
                                                  `;

    document.head.appendChild(style);
  }

  // Call both layout adjustment functions when page loads
  window.addEventListener("load", function() {
    adjustTerminalLayout();
    addCustomStyles();
    addEasterEggStyles();
  });
}
