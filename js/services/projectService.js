const PROJECTS_JSON_URL = 'resources/json/projects.json';

export default class ProjectService {
    constructor() {
        this.projects = [];
    }

    async fetchProjects() {
        if (!this.projects.length) {
            await fetch(PROJECTS_JSON_URL).then(response => response.json()).then(jsonArr => {
                this.projects = jsonArr;
            });
        }

        return this.projects;
    }
}