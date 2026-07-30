(function () {
  "use strict";

  const GITHUB_USER = "Dante983";
  const GITHUB_API = "https://api.github.com/users/" + GITHUB_USER + "/repos?per_page=100&sort=updated";
  const CACHE_KEY = "dante983-portfolio-repos";
  const CACHE_TTL = 30 * 60 * 1000;
  const FEATURED_REPOS = ["snippetbox", "portfolio", "vp-band", "ai-image-gen"];

  const state = {
    projects: window.PortfolioData.fallbackProjects,
    history: [],
    historyIndex: 0,
  };

  const elements = {
    projectsList: document.getElementById("projects-list"),
    githubState: document.getElementById("github-state"),
    repoCount: document.getElementById("repo-count"),
    terminalOutput: document.getElementById("terminal-output"),
    terminalForm: document.getElementById("terminal-form"),
    terminalInput: document.getElementById("terminal-input"),
    clearButton: document.getElementById("clear-button"),
    clock: document.getElementById("clock"),
  };

  function getCachedRepos() {
    try {
      const cache = JSON.parse(localStorage.getItem(CACHE_KEY));
      if (cache && Date.now() - cache.savedAt < CACHE_TTL && Array.isArray(cache.repos)) {
        return cache.repos;
      }
    } catch (error) {
      return null;
    }
    return null;
  }

  function cacheRepos(repos) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), repos }));
    } catch (error) {
      // Storage can be unavailable in privacy mode; the live response still works.
    }
  }

  function mergeFallbackDescription(repo) {
    const fallback = window.PortfolioData.fallbackProjects.find(function (item) {
      return item.name === repo.name;
    });

    if (!repo.description && fallback) {
      return Object.assign({}, repo, { description: fallback.description });
    }

    return repo;
  }

  function selectFeaturedRepos(repos) {
    const sourceRepos = repos.filter(function (repo) {
      return !repo.fork && !repo.archived;
    });

    const selected = FEATURED_REPOS.map(function (name) {
      return sourceRepos.find(function (repo) {
        return repo.name === name;
      });
    }).filter(Boolean);

    sourceRepos.forEach(function (repo) {
      if (selected.length < 4 && !selected.some(function (item) { return item.id === repo.id; })) {
        selected.push(repo);
      }
    });

    return selected.slice(0, 4).map(mergeFallbackDescription);
  }

  function formatUpdated(dateValue) {
    if (!dateValue) return "recently";
    return new Intl.DateTimeFormat("en", {
      month: "short",
      year: "numeric",
    }).format(new Date(dateValue));
  }

  function renderProjects(projects) {
    elements.projectsList.replaceChildren();

    projects.forEach(function (project) {
      const card = document.createElement("a");
      card.className = "project-card";
      card.href = project.html_url;
      card.target = "_blank";
      card.rel = "noreferrer";
      card.setAttribute("aria-label", "View " + project.name + " on GitHub");

      const name = document.createElement("span");
      name.className = "project-name";
      name.textContent = "git:" + project.name;

      const arrow = document.createElement("span");
      arrow.textContent = "↗";
      arrow.setAttribute("aria-hidden", "true");

      const description = document.createElement("p");
      description.className = "project-description";
      description.textContent = project.description || "View source and project details on GitHub.";

      const meta = document.createElement("div");
      meta.className = "project-meta";

      const language = document.createElement("span");
      language.className = "language";
      language.textContent = project.language || "Code";

      const stars = document.createElement("span");
      stars.className = "star";
      stars.textContent = "★ " + (project.stargazers_count || 0);

      const updated = document.createElement("span");
      updated.textContent = "updated " + formatUpdated(project.updated_at);

      meta.append(language, stars, updated);
      card.append(name, arrow, description, meta);
      elements.projectsList.appendChild(card);
    });
  }

  async function loadProjects() {
    const cachedRepos = getCachedRepos();

    if (cachedRepos) {
      state.projects = selectFeaturedRepos(cachedRepos);
      renderProjects(state.projects);
      elements.repoCount.textContent = cachedRepos.length + " repos";
      elements.githubState.textContent = "cached";
      elements.githubState.classList.add("is-live");
      return;
    }

    try {
      const response = await fetch(GITHUB_API, {
        headers: { Accept: "application/vnd.github+json" },
      });

      if (!response.ok) {
        throw new Error("GitHub returned " + response.status);
      }

      const repos = await response.json();
      cacheRepos(repos);
      state.projects = selectFeaturedRepos(repos);
      renderProjects(state.projects);
      elements.repoCount.textContent = repos.length + " repos";
      elements.githubState.textContent = "live";
      elements.githubState.classList.add("is-live");
    } catch (error) {
      state.projects = window.PortfolioData.fallbackProjects;
      renderProjects(state.projects);
      elements.githubState.textContent = "local";
      elements.githubState.title = "Showing local project data because GitHub is unavailable.";
    }
  }

  function addOutput(text, type) {
    const line = document.createElement("p");
    line.className = "output-line" + (type ? " " + type : "");
    line.textContent = text;
    elements.terminalOutput.appendChild(line);
    elements.terminalOutput.scrollTop = elements.terminalOutput.scrollHeight;
  }

  function clearTerminal() {
    elements.terminalOutput.replaceChildren();
  }

  function openExternal(url) {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  }

  function executeCommand(rawCommand, options) {
    const command = rawCommand.trim();
    const config = options || {};

    if (!command) return;

    if (!config.hideCommand) {
      addOutput("visitor@nikola ~/portfolio ❯ " + command, "command-line");
    }

    const result = window.PortfolioData.runCommand(command, {
      projects: state.projects,
      open: openExternal,
    });

    if (result && result.clear) {
      clearTerminal();
      return;
    }

    result.forEach(function (output) {
      addOutput(output.text, output.type);
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const command = elements.terminalInput.value;

    if (command.trim()) {
      state.history.push(command);
      state.historyIndex = state.history.length;
      executeCommand(command);
    }

    elements.terminalInput.value = "";
  }

  function handleHistory(event) {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (state.historyIndex > 0) state.historyIndex -= 1;
      elements.terminalInput.value = state.history[state.historyIndex] || "";
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (state.historyIndex < state.history.length) state.historyIndex += 1;
      elements.terminalInput.value = state.history[state.historyIndex] || "";
    }
  }

  function handleGlobalShortcut(event) {
    const target = event.target;
    const isTyping = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement;

    if (event.key === "/" && !isTyping) {
      event.preventDefault();
      elements.terminalInput.focus();
    }

    if (event.key === "Escape" && document.activeElement === elements.terminalInput) {
      elements.terminalInput.blur();
    }
  }

  function updateClock() {
    elements.clock.textContent = new Intl.DateTimeFormat("en", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date());
  }

  function initializeTerminal() {
    addOutput("Nikola Savić / portfolio session", "success");
    addOutput("PHP + Go developer · Linux · Neovim · tmux");
    addOutput("Type 'help' or press / to focus this shell.");

    elements.terminalForm.addEventListener("submit", handleSubmit);
    elements.terminalInput.addEventListener("keydown", handleHistory);
    elements.clearButton.addEventListener("click", function () {
      clearTerminal();
      elements.terminalInput.focus();
    });

    document.querySelectorAll("[data-command]").forEach(function (button) {
      button.addEventListener("click", function () {
        const command = button.getAttribute("data-command");
        executeCommand(command);
        elements.terminalInput.focus();
      });
    });

    document.addEventListener("keydown", handleGlobalShortcut);
  }

  function init() {
    renderProjects(state.projects);
    initializeTerminal();
    updateClock();
    window.setInterval(updateClock, 30000);
    loadProjects();
  }

  init();
})();
