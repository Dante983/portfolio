(function () {
  "use strict";

  const profile = {
    name: "Nikola Savić",
    handle: "Dante983",
    role: "Software Developer",
    location: "Banja Luka, Bosnia and Herzegovina",
    company: "Bay42 & Perform[CB]",
    focus: ["PHP", "Laravel", "Go", "backend systems", "web applications"],
    workflow: ["Linux", "Neovim", "tmux", "Git", "Docker"],
    databases: ["MySQL", "PostgreSQL", "MongoDB", "ClickHouse", "Redis"],
    github: "https://github.com/Dante983",
    linkedin: "https://www.linkedin.com/in/nikola-savi%C4%87-10b8b9179/",
    email: "savicn209@gmail.com",
  };

  const fallbackProjects = [
    {
      name: "snippetbox",
      description: "A secure Go web application for creating and sharing text snippets.",
      language: "Go",
      stargazers_count: 3,
      html_url: "https://github.com/Dante983/snippetbox",
      updated_at: "2026-03-10T13:39:24Z",
    },
    {
      name: "portfolio",
      description: "An interactive terminal-inspired portfolio built with vanilla JavaScript.",
      language: "JavaScript",
      stargazers_count: 1,
      html_url: "https://github.com/Dante983/portfolio",
      updated_at: "2025-06-22T21:23:44Z",
    },
    {
      name: "vp-band",
      description: "A band website with an event calendar and administrative tools.",
      language: "JavaScript",
      stargazers_count: 1,
      html_url: "https://github.com/Dante983/vp-band",
      updated_at: "2023-05-30T19:48:55Z",
    },
    {
      name: "ai-image-gen",
      description: "A small Node.js application exploring AI image generation.",
      language: "JavaScript",
      stargazers_count: 0,
      html_url: "https://github.com/Dante983/ai-image-gen",
      updated_at: "2023-04-01T00:00:00Z",
    },
  ];

  const commandHelp = [
    ["help", "list available commands"],
    ["about", "read my short profile"],
    ["projects", "list featured GitHub repositories"],
    ["stack", "show languages, data stores and tools"],
    ["contact", "show ways to get in touch"],
    ["github", "open my GitHub profile"],
    ["neofetch", "display developer system information"],
    ["clear", "clear the shell output"],
  ];

  function line(text, type) {
    return { text, type: type || "" };
  }

  function projectLines(projects) {
    return projects.flatMap(function (project) {
      const meta = [project.language || "Code", "★ " + (project.stargazers_count || 0)].join(" · ");
      return [
        line(project.name + "  " + meta, "success"),
        line("  " + (project.description || "View this project on GitHub.")),
        line("  " + project.html_url),
      ];
    });
  }

  function runCommand(rawCommand, context) {
    const input = rawCommand.trim();
    const command = input.toLowerCase().split(/\s+/)[0];
    const projects = context.projects || fallbackProjects;

    switch (command) {
      case "":
        return [];
      case "help":
        return [
          line("Available commands:", "success"),
          ...commandHelp.map(function (item) {
            return line(item[0].padEnd(12) + item[1]);
          }),
        ];
      case "about":
      case "whois":
        return [
          line(profile.name + " — " + profile.role, "success"),
          line("Based in " + profile.location + "."),
          line("Focused on " + profile.focus.join(", ") + "."),
          line("I build dependable products, APIs and data-heavy web applications."),
        ];
      case "projects":
      case "ls":
        return projectLines(projects);
      case "stack":
      case "skills":
        return [
          line("Languages    PHP · Go · JavaScript · Lua", "success"),
          line("Frameworks   Laravel · React · Vue · Node.js"),
          line("Data         " + profile.databases.join(" · ")),
          line("Workflow     " + profile.workflow.join(" · ")),
        ];
      case "contact":
      case "social":
        return [
          line("Email      mailto:" + profile.email, "success"),
          line("GitHub     " + profile.github),
          line("LinkedIn   " + profile.linkedin),
        ];
      case "github":
        context.open(profile.github);
        return [line("Opening " + profile.github + " …", "success")];
      case "neofetch":
        return [
          line("nikola@arch", "success"),
          line("------------"),
          line("OS          Linux"),
          line("Role        " + profile.role),
          line("Focus       PHP / Go"),
          line("Editor      Neovim"),
          line("Multiplexer tmux"),
          line("Location    Banja Luka"),
          line("GitHub      @" + profile.handle),
        ];
      case "pwd":
        return [line("/home/visitor/portfolio")];
      case "whoami":
        return [line("visitor — thanks for stopping by.")];
      case "date":
        return [line(new Date().toString())];
      case "clear":
        return { clear: true };
      default:
        return [
          line("zsh: command not found: " + command, "error"),
          line("Run 'help' to see available commands."),
        ];
    }
  }

  window.PortfolioData = {
    profile,
    fallbackProjects,
    runCommand,
  };
})();
