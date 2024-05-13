export const projectsRouting = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const projectsContainer = document.querySelector(
      ".projects"
    ) as HTMLElement;

    if (projectsContainer) {
      projectsContainer.addEventListener("click", (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (target instanceof HTMLButtonElement) {
          const projectId = target.id;
          window.location.href = projectId;
        }
      });
    }
  });
};
