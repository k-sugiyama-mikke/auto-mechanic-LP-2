document.addEventListener("DOMContentLoaded", () => {
  const paramsJs = new URLSearchParams(window.location.search);
  const isTestJs = paramsJs.get("test") ? true : false;

  if (paramsJs.has("complete") && !isTestJs) {
    console.log("最終CV発火");

    const platformJs = paramsJs.get("platform") || "";
    const uTmMediumJs = paramsJs.get("utm_medium") || "";
    switch (platformJs) {
      case "meta":
        // fbq("track", "Lead", {
        //   content_name: "auto_mechanic_register",
        //   value: 1000.0,
        //   currency: "JPY",
        //   lead_type: "mechanic_entry_register",
        // });
        break;
      case "google":
        switch (uTmMediumJs) {
          case "search":
            gtag("event", "conversion", {
              send_to: "AW-16680263633/oYSfCI2tsrEbENG_4pE-",
              value: 1000.0,
              currency: "JPY",
            });
            break;
          case "display":
            // gtag("event", "conversion", {
            //   send_to: "AW-16680263633/4dzpCJWVgpAbENG_4pE-",
            //   value: 1000.0,
            //   currency: "JPY",
            // });
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  }

  /**
   * 利用規約モーダルを閉じる（×ボタン）
   */
  document
    .getElementById("terms-dialog-close")
    .addEventListener("click", () => {
      const dialog = document.getElementById("terms-dialog");
      console.log(dialog);
      dialog.classList.add("invisible");
    });

  /**
   * 利用規約モーダルを閉じる（画面）
   */
  document.getElementById("terms-dialog").addEventListener("click", () => {
    const dialog = document.getElementById("terms-dialog");
    console.log(dialog);
    dialog.classList.add("invisible");
  });

  /**
   * 会社概要モーダルを閉じる（×ボタン）
   */
  document
    .getElementById("company-dialog-close")
    .addEventListener("click", () => {
      const dialog = document.getElementById("company-dialog");
      console.log(dialog);
      dialog.classList.add("invisible");
    });

  /**
   * 利用規約モーダルを閉じる（画面）
   */
  document.getElementById("company-dialog").addEventListener("click", () => {
    const dialog = document.getElementById("company-dialog");
    console.log(dialog);
    dialog.classList.add("invisible");
  });

  /**
   * 利用規約モーダルを開く
   */
  document.getElementById("terms-text").addEventListener("click", () => {
    console.log("利用規約");
    const dialog = document.getElementById("terms-dialog");
    dialog.classList.remove("invisible");
  });

  /**
   * 会社概要モーダルを開く
   */
  document.getElementById("company-text").addEventListener("click", () => {
    const dialog = document.getElementById("company-dialog");
    dialog.classList.remove("invisible");
  });
});
