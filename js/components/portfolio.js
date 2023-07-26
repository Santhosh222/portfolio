const SKILL_BTN_GROUP_WRAPPER_SELECTOR = '.btn-group--technology';
const PROJECTS_WRAPPER_SELECTOR = '.portfolio__projects';
const BTN_ACTIVE_SELECTOR = '.btn-tertiary--active';
const NO_PROJECTS_SELECTOR = '.portfolio__projects-no-results';
const BTN_ACTIVE_CLASS = 'btn-tertiary--active';
const PROJECT_IMG_ROOT_PATH = 'img/projects/';
const FALLBACK_IMG = 'project-fallback.png';
const PROJECT_HIDE_CLASS = 'portfolio__project--hide';
const NO_PROJECTS_SHOW_CLASS = 'portfolio__projects-no-results--show';

export default class Portfolio {
    constructor(element) {
        this.element = element;
        this.projects = [];
        this.skillWrapperEl = this.element.querySelector(SKILL_BTN_GROUP_WRAPPER_SELECTOR);
        this.projectsWrapperEl = this.element.querySelector(PROJECTS_WRAPPER_SELECTOR);
        this.noProjectsEl = this.element.querySelector(NO_PROJECTS_SELECTOR);
        this.clearProjectFilterEl = this.noProjectsEl.querySelector('.btn');
        this.skillOptionsEl = [];
        this.projectService = window.services.projectService;

        this.fetchProjectDetails().then(projects => {
            this.projects = projects;
            this.renderSkillsAndProjects(projects);
            this.skillOptionsEl = this.skillWrapperEl.querySelectorAll('button');

            this.bindEvents();
        });
    }

    async fetchProjectDetails() {
        const projects = await this.projectService.fetchProjects();
        return projects;
    }

    renderSkillsAndProjects(projects) {
        this.renderSkills(projects);
        this.renderProjects(projects);
    }

    renderSkills(projects) {
        const skills = [...new Set(projects.flatMap(project => project.technologies))];
        const skillsHTML = skills
            .map(skill => `<button class="btn btn-tertiary">${skill}</button>`)
            .join('');
        this.skillWrapperEl.innerHTML = skillsHTML;
    }

    renderProjects(projects) {
        const projectsHTML = projects
            .map(project => `
                <div class="portfolio__project" data-project-id="${project.id}">
                    <img src="${PROJECT_IMG_ROOT_PATH + project.image}" alt="${project.name}" 
                        class="portfolio__project-image">
                    <p class="portfolio__project-text">${project.name}</p>
                    <a href="${project.link}" target="_blank" aria-label="Project ${project.name}"
                        class="portfolio__project-btn">&plus;</a>
                </div>
            `).join('');
        this.projectsWrapperEl.innerHTML = projectsHTML;
        this.projectsWrapperEl.querySelectorAll('.portfolio__project-image').forEach(img => {
            img.onerror = () => this.setFallbackImage(img);
        });
    }

    setFallbackImage(image) {
        image.src = PROJECT_IMG_ROOT_PATH + FALLBACK_IMG;
    }

    bindEvents() {
        this.skillOptionsEl.forEach(skillOptionEl => {
            skillOptionEl.addEventListener('click', () => {
                this.filterProjects(skillOptionEl);
            });
        });

        this.clearProjectFilterEl.addEventListener('click', () => this.unselectSkills());
    }

    filterProjects(skillOptionEl) {
        this.hideNoResults();
        if (skillOptionEl) {
            if (skillOptionEl.classList.contains(BTN_ACTIVE_CLASS)) {
                skillOptionEl.blur();
            }
            skillOptionEl.classList.toggle(BTN_ACTIVE_CLASS);
        }
        const skillsSelected = [...this.skillWrapperEl.querySelectorAll(BTN_ACTIVE_SELECTOR)]
            .map(el => el.innerText);
        let projectsToShow = 0;
        for (let project of this.projects) {
            if (this.filterProjectWithSkils(project, skillsSelected)) {
                this.projectsWrapperEl.querySelector(`[data-project-id=${project.id}]`).classList.remove(PROJECT_HIDE_CLASS);
                projectsToShow++;
            } else {
                this.projectsWrapperEl.querySelector(`[data-project-id=${project.id}]`).classList.add(PROJECT_HIDE_CLASS);
            }
        }
        if (projectsToShow === 0) {
            this.showNoResults();
        }
    }

    filterProjectWithSkils(project, skillsSelected) {
        return skillsSelected.every(skill => project.technologies.includes(skill));
    }

    unselectSkills() {
        [...this.skillWrapperEl.querySelectorAll(BTN_ACTIVE_SELECTOR)]
            .forEach(el => el.classList.remove(BTN_ACTIVE_CLASS));
        this.filterProjects();
    }

    showNoResults() {
        this.noProjectsEl.classList.add(NO_PROJECTS_SHOW_CLASS);
    }

    hideNoResults() {
        this.noProjectsEl.classList.remove(NO_PROJECTS_SHOW_CLASS);
    }
}