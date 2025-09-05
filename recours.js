function togglePasswordVisibility(type) {
  const passwordInput = document.getElementById(type);
  const toggleIcon = document.getElementById(`show-${type}-icon`);

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleIcon.classList.remove("fa-eye");
    toggleIcon.classList.add("fa-eye-slash");
  } else {
    passwordInput.type = "password";
    toggleIcon.classList.remove("fa-eye-slash");
    toggleIcon.classList.add("fa-eye");
  }
}

function toggleErrorMessage(
  isDisplayed,
  idErrorElement,
  inputElement,
  message = ""
) {
  const errorMessageElement = document.getElementById(idErrorElement);
  errorMessageElement.textContent = message;
  errorMessageElement.classList.toggle("visually-hidden", !isDisplayed);
  inputElement.parentNode.classList.toggle("error", isDisplayed);
}

function addChangeEvents() {
  document
    .getElementById("email-new-user")
    .addEventListener("input", function (e) {
      const email = this.value;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email)) {
        toggleErrorMessage(
          true,
          "errFormatEmail1",
          e.target,
          "L'adresse électronique ne respecte pas le format (exemple@domaine.fr)."
        );
      } else {
        toggleErrorMessage(false, "errFormatEmail1", e.target);
      }
    });

  document
    .getElementById("confirmation-email")
    .addEventListener("input", function (e) {
      const value = this.value;
      if (value !== document.getElementById("email-new-user").value) {
        toggleErrorMessage(
          true,
          "errFormatConfirmEmail",
          e.target,
          "Les adresses électroniques ne sont pas identiques."
        );
      } else {
        toggleErrorMessage(false, "errFormatConfirmEmail", e.target);
      }
    });

  document.getElementById("password").addEventListener("input", function (e) {
    const password = this.value;
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

    if (!passwordPattern.test(password)) {
      toggleErrorMessage(
        true,
        "errFormatMdp",
        e.target,
        "Le mot de passe ne respecte pas le format."
      );
    } else {
      toggleErrorMessage(false, "errFormatMdp", e.target);
    }
  });

  document
    .getElementById("confirmpassword")
    .addEventListener("input", function (e) {
      if (this.value !== document.getElementById("password").value) {
        toggleErrorMessage(
          true,
          "errFormatConfirmMdp",
          e.target,
          "Les mots de passe ne correspondent pas."
        );
      } else {
        toggleErrorMessage(false, "errFormatConfirmMdp", e.target);
      }
    });

  document
    .getElementById("btn-reset-date")
    .addEventListener("click", function (e) {
      document.getElementById("jour").value = "";
      document.getElementById("mois").value = "";
      document.getElementById("annee").value = "";
    });

  document
    .getElementById("telephoneOne")
    .addEventListener("input", function (e) {
      const phonePattern = /^0[1-9](\s?\d{2}){4}$/;
      if (!phonePattern.test(this.value)) {
        toggleErrorMessage(
          true,
          "errFormatPhone1",
          e.target,
          "Le numéro de téléphone ne respecte pas le format."
        );
      } else if (this.value === document.getElementById("telephoneTwo").value) {
        toggleErrorMessage(
          true,
          "errFormatPhone1",
          e.target,
          "Les deux numéros de téléphone ne peuvent pas être identiques."
        );
      } else {
        toggleErrorMessage(false, "errFormatPhone1", e.target);
      }
    });

  document
    .getElementById("telephoneTwo")
    .addEventListener("input", function (e) {
      const phonePattern = /^0[1-9](\s?\d{2}){4}$/;
      if (!phonePattern.test(this.value)) {
        toggleErrorMessage(
          true,
          "errFormatPhone2",
          e.target,
          "Le numéro de téléphone ne respecte pas le format."
        );
      } else if (this.value === document.getElementById("telephoneOne").value) {
        toggleErrorMessage(
          true,
          "errFormatPhone2",
          e.target,
          "Les deux numéros de téléphone ne peuvent pas être identiques."
        );
      } else {
        toggleErrorMessage(false, "errFormatPhone2", e.target);
      }
    });

  Array.prototype.forEach.call(
    document.querySelectorAll('input[type=radio][name="typeRecours"]'),
    function (radio) {
      radio.addEventListener("change", function (e) {
        const numeroFPS = document.getElementById("fps");
        const numeroTE = document.getElementById("te");
        if (this.value === "FPS") {
          numeroFPS.setAttribute("required", "true");
          numeroFPS.removeAttribute("disabled");
          numeroTE.value = "";
          numeroTE.removeAttribute("required");
          numeroTE.setAttribute("disabled", "true");
        } else {
          numeroTE.setAttribute("required", "true");
          numeroTE.removeAttribute("disabled");
          numeroFPS.value = "";
          numeroFPS.removeAttribute("required");
          numeroFPS.setAttribute("disabled", "true");
        }
      });
    }
  );
}

function main() {
  document
    .getElementById("show-password-button")
    .addEventListener("click", () => togglePasswordVisibility("password"));
  document
    .getElementById("show-confirmpassword-button")
    .addEventListener("click", () =>
      togglePasswordVisibility("confirmpassword")
    );

  addChangeEvents();

  document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    const loader = document.getElementById("loader");
    loader.classList.remove("visually-hidden");
    const errorAlert = document.getElementById("errorAlert");
    const errorAlertMessage = document.getElementById("errorAlertMessage");

    if (
      e.target.typeRecours.value === "FPS" &&
      e.target.numeroFPS.value !== "25094311 25 0 212 212 006"
    ) {
      errorAlertMessage.textContent =
        "• Le numéro du forfait de post-stationnement (FPS) est incorrect.";
      errorAlert.classList.remove("visually-hidden");
      window.scrollTo(0, 0);
      loader.classList.add("visually-hidden");
    } else if (
      e.target.typeRecours.value === "TE" &&
      e.target.numeroTE.value !== "033012 87823091583"
    ) {
      window.scrollTo(0, 0);
      errorAlertMessage.textContent =
        "• Le numéro du titre exécutoire (TE) est incorrect.";
      errorAlert.classList.remove("visually-hidden");
      loader.classList.add("visually-hidden");
    } else if (
      e.target.email.value &&
      e.target.telephoneOne.value &&
      e.target.telephoneTwo.value &&
      (e.target.numeroFPS.value === "25094311 25 0 212 212 006" ||
        e.target.numeroTE.value === "033012 87823091583")
    ) {
      if (!errorAlert.classList.contains("visually-hidden")) {
        errorAlert.classList.add("visually-hidden");
        errorAlertMessage.textContent = "";
      }

      const formData = new FormData(e.target);
      const object = Object.fromEntries(formData);
      delete object.confirmPassword;
      delete object.password;
      const json = JSON.stringify(object);

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      })
        .then(async (response) => {
          if (response.status == 200) {
            e.target.reset();
            alert("La demande a été envoyée. Nous vous contacterons bientôt.");
          } else {
            errorAlertMessage.textContent =
              "• Une erreur est survenue. Veuillez réessayer.";
            errorAlert.classList.remove("visually-hidden");
          }
        })
        .catch((error) => {
          result.innerHTML = "Something went wrong!";
        })
        .finally(() => {
          loader.classList.add("visually-hidden");
          window.scrollTo(0, 0);
        });
    } else {
      if (errorAlert.classList.contains("visually-hidden")) {
        errorAlertMessage.textContent =
          "• Veuillez renseigner tous les champs obligatoires";
        errorAlert.classList.remove("visually-hidden");
      }
      loader.classList.add("visually-hidden");
      window.scrollTo(0, 0);
    }
  });
}

main();
