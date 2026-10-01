(() => {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#nav-links");

  if (menuButton && navigation) {
    const closeMenu = () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Abrir menu");
      navigation.classList.remove("is-open");
    };
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
      navigation.classList.toggle("is-open", !isOpen);
    });
    navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  const filters = document.querySelectorAll(".filter-button");
  const projects = document.querySelectorAll(".project-card");
  filters.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.filter;
      filters.forEach((filter) => {
        const active = filter === button;
        filter.classList.toggle("is-active", active);
        filter.setAttribute("aria-pressed", String(active));
      });
      projects.forEach((project) => {
        project.hidden = category !== "all" && project.dataset.category !== category;
      });
    });
  });

  const dialog = document.querySelector("#project-lightbox");
  const lightboxImage = dialog?.querySelector("img");
  const lightboxCaption = dialog?.querySelector(".lightbox-caption");
  const closeLightbox = dialog?.querySelector(".lightbox-close");
  if (dialog && lightboxImage && lightboxCaption && closeLightbox) {
    document.querySelectorAll(".project-photo-button").forEach((button) => {
      button.addEventListener("click", () => {
        const card = button.closest(".project-card");
        const image = button.querySelector("img");
        if (!card || !image) return;
        lightboxImage.src = image.currentSrc || image.src;
        lightboxImage.alt = image.alt;
        lightboxCaption.textContent = card.dataset.title || image.alt;
        dialog.showModal();
      });
    });
    closeLightbox.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener("close", () => {
      lightboxImage.removeAttribute("src");
    });
  }

  const year = document.querySelector("#current-year");
  if (year) year.textContent = String(new Date().getFullYear());

  const form = document.querySelector("#quote-form");
  const status = document.querySelector("#form-status");
  if (form && status) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const fields = new FormData(form);
      const message = [
        "Olá! Gostaria de solicitar um orçamento para impressão 3D.",
        "",
        "Nome: " + String(fields.get("name")).trim(),
        "E-mail: " + String(fields.get("email")).trim(),
        "",
        "Projeto:",
        String(fields.get("details")).trim()
      ].join("\n");
      const whatsappUrl = "https://wa.me/351937854517?text=" + encodeURIComponent(message);
      status.textContent = "Abrindo o WhatsApp com sua solicitação. Revise a mensagem e toque em enviar.";
      status.classList.remove("is-error");
      status.classList.add("is-success");
      window.location.assign(whatsappUrl);
    });
  }
})();