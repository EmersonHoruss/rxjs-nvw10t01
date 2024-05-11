export const projectsRouting = () => {
  const projectsContainer = document.querySelector(".projects") as HTMLElement;

  projectsContainer.addEventListener("click", (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const projectItem = target.closest(".projects__item");
    if (projectItem) {
      const projectId = projectItem.id;
      console.log("ID del proyecto:", projectId);
    }
  });
};
