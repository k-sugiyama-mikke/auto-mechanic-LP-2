document.addEventListener("DOMContentLoaded", () => {
  const RECAPTCHA_SITE_KEY = "6Lffw6YrAAAAAL1pqT366UTTqSGDRvOzcv8glFRf";

  const steps = document.querySelectorAll(".form-step");
  const progressBar = document.getElementById("progress-bar");
  const progressNumerator = document.getElementById("progress-numerator");
  const progressDenominator = document.getElementById("progress-denominator");
  let currentPage = 0;

  //1枚目
  let isTransitedFirstPage = false;
  //2枚目
  let isTransitedSecondPage = false;
  //3枚目
  let isTransitedThreePage = false;
  //4枚目
  let isTransitedFourPage = false;
  //5枚目
  let isTransitedFivePage = false;
  //6枚目
  let isTransitedSixPage = false;
  //テスト有無
  let isTest = new URLSearchParams(window.location.search).get("test")
    ? true
    : false;

  progressDenominator.textContent = steps.length;
  init();

  //郵便番号フォームの文字数制限
  const zipCode = document.getElementById("zip-code");
  zipCode.setAttribute("pattern", "[0-9]*");
  zipCode.setAttribute("inputmode", "numeric");
  zipCode.setAttribute("maxlength", "7");

  //生まれ年フォームの文字数制限
  const birth = document.getElementById("birth");
  birth.setAttribute("pattern", "[0-9]*");
  birth.setAttribute("inputmode", "numeric");
  birth.setAttribute("maxlength", "4");

  //電話番号フォームの文字数制限
  const tel = document.getElementById("tel");
  tel.setAttribute("pattern", "[0-9]*");
  tel.setAttribute("inputmode", "numeric");
  tel.setAttribute("maxlength", "11");

  //電話番号フォームの文字数制限
  const currentJobDate = document.getElementById("current-job-date");
  currentJobDate.textContent = getCurrentDate();

  function getCurrentDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const date = today.getDate();

    return `${month}/${date}`;
  }
  /**
   * 次へボタン
   */
  document.querySelector(".next-btn").addEventListener("click", () => {
    if (currentPage < steps.length) {
      console.log("currentPage");
      console.log(currentPage);
      currentPage++;
      updateSteps();
    }
  });

  /**
   * 戻るボタン
   */
  document.querySelector(".prev-btn").addEventListener("click", () => {
    if (currentPage > 0) {
      console.log("currentPage");
      console.log(currentPage);
      currentPage--;

      //戻るページを取得する
      const beforeCurrentPage = currentPage;
      currentBeforeStep = null;
      steps.forEach((step, index) => {
        if (index == beforeCurrentPage) {
          currentBeforeStep = step;
        }
      });

      updateSteps();
    }
  });

  /**
   * ファーストモーダル（上のボタン）
   */
  document
    .querySelector("#intension-dialog__button-upper")
    .addEventListener("click", () => {
      const intensionDialog = document.getElementById("intension-dialog");
      const mechanicFirstView = document.getElementById("mechanic-first-view");
      const form = document.getElementById("form-screen");
      const slider = document.getElementById("slider");
      const currentPlan = document.getElementById("current-plan");
      currentPlan.value = "近いうちに転職したい";
      const offerLabel = document.getElementById("offer-label");

      intensionDialog.classList.add("invisible");
      mechanicFirstView.classList.add("invisible");
      form.classList.remove("invisible");
      slider.classList.add("invisible");
      offerLabel.classList.remove("invisible");
      fireConversion(1);
    });

  /**
   * ファーストモーダル（下のボタン）
   */
  document
    .querySelector("#intension-dialog__button-bottom")
    .addEventListener("click", () => {
      const intensionDialog = document.getElementById("intension-dialog");
      const mechanicFirstView = document.getElementById("mechanic-first-view");
      const form = document.getElementById("form-screen");
      const slider = document.getElementById("slider");
      const currentPlan = document.getElementById("current-plan");
      currentPlan.value = "今は情報収集したい";
      const offerLabel = document.getElementById("offer-label");

      intensionDialog.classList.add("invisible");
      mechanicFirstView.classList.add("invisible");
      form.classList.remove("invisible");
      slider.classList.add("invisible");
      offerLabel.classList.remove("invisible");
      fireConversion(1);
    });

  /**
   * 利用規約モーダルを閉じる（×ボタン）
   */
  document
    .getElementById("terms-dialog-close")
    .addEventListener("click", () => {
      console.log("クリックされた");
      const dialog = document.getElementById("terms-dialog");
      console.log(dialog);
      dialog.classList.add("invisible");
    });

  /**
   * 利用規約モーダルを閉じる（画面）
   */
  document.getElementById("terms-dialog").addEventListener("click", () => {
    console.log("クリックされた");
    const dialog = document.getElementById("terms-dialog");
    console.log(dialog);
    dialog.classList.add("invisible");
  });

  /**
   * 利用規約モーダルを開く
   */
  document.getElementById("terms-text").addEventListener("click", () => {
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

  /**
   * 会社概要モーダルを閉じる（×ボタン）
   */
  document
    .getElementById("company-dialog-close")
    .addEventListener("click", () => {
      console.log("クリックされた");
      const dialog = document.getElementById("company-dialog");
      console.log(dialog);
      dialog.classList.add("invisible");
    });

  /**
   * 会社概要モーダルを閉じる（画面）
   */
  document.getElementById("company-dialog").addEventListener("click", () => {
    console.log("クリックされた");
    const dialog = document.getElementById("company-dialog");
    console.log(dialog);
    dialog.classList.add("invisible");
  });

  /**
   * フォーム更新処理
   */
  function updateSteps() {
    steps.forEach((step, index) => {
      step.classList.remove("active", "back-slide");
      if (index === currentPage) {
        step.classList.add("active");
      } else if (index < currentPage) {
        step.classList.add("back-slide");
      }
    });
    console.log("updateSteps currentPage");
    console.log(currentPage);

    const nowCurrentPage = currentPage + 1;

    // Update progress
    const progressPercent = Math.round((nowCurrentPage / steps.length) * 100);
    progressBar.style.width = `${progressPercent}%`;
    progressNumerator.textContent = nowCurrentPage;

    // formContainer.style.transform = `translateX(-${100 * currentPage}%)`;

    if (currentPage != 0) {
      //   adjustFormHeight();
    }

    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const submitBtn = document.getElementById("submit-btn");
    const slider = document.getElementById("slider");
    console.log("page数");
    console.log(nowCurrentPage);

    switch (nowCurrentPage) {
      case 1:
        prevBtn.classList.add("invisible");
        nextBtn.classList.remove("invisible");
        submitBtn.classList.add("invisible");
        checkCheckboxAndRadioForm(nowCurrentPage);

        break;
      case 2:
        prevBtn.classList.remove("invisible");
        nextBtn.classList.add("invisible");
        submitBtn.classList.add("invisible");
        slider.classList.add("invisible");
        slider.classList.add("invisible");
        checkCheckboxAndRadioForm(nowCurrentPage);
        fireConversion(2);

        break;
      case 3:
        console.log("case 3");
        prevBtn.classList.remove("invisible");
        nextBtn.classList.remove("invisible");
        submitBtn.classList.add("invisible");
        slider.classList.remove("invisible");

        if (validateFormThirdQuestion()) {
          addDecorationAfterInputComplete();
          nextBtnInvalidationCancel();
        } else {
          deleteDecorationAfterInputComplete();
          nextBtnDisabled();
        }
        fireConversion(3);

        break;
      case 4:
        console.log("case 4");
        prevBtn.classList.remove("invisible");
        nextBtn.classList.add("invisible");
        submitBtn.classList.remove("invisible");
        slider.classList.remove("invisible");

        let validate = validateFormFourQuestion();
        fireConversion(4);

        const isLastPage = true;
        if (validate.result) {
          addDecorationAfterInputComplete(isLastPage);
          submitBtnInvalidationCancel();
        } else {
          deleteDecorationAfterInputComplete();
          submitBtnDisabled();
        }
        break;

      default:
        break;
    }
  }

  /**
   * データ送信する
   */
  document
    .getElementById("submit-btn")
    .addEventListener("click", async function () {
      const submitBtn = document.getElementById("submit-btn");
      submitBtn.disabled = true;

      const loading = document.getElementById("loading");
      loading.classList.remove("invisible");

      try {
        const data = collectFormData();
        const API_ENDPOINT = "https://d3akfz01stgoxo.cloudfront.net/submit";

        if (!window.grecaptcha) {
          throw new Error("reCAPTCHAが読み込まれていません");
        }

        // APIの準備完了を待つ
        await new Promise((done) => grecaptcha.ready(done));

        // トークン取得
        const token = await grecaptcha.execute(RECAPTCHA_SITE_KEY, {
          action: "mechanic_contact",
        });

        data.recaptchaToken = token;

        const res = await fetch(API_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        // const result = await res.json();
        if (res.ok) {
          if (!isTest) {
            if (data.adMedia == "meta") {
              fireGa4CvSubmitByMeta();
            }
          }

          const dir = location.pathname.replace(/[^/]+$/, "");
          const merged = new URLSearchParams(location.search); // いまのクエリを取得
          merged.set("complete", "1"); // 追加したいものだけ足す

          const thankyou = new URL(`${dir}complete.html`, location.href);
          thankyou.search = merged.toString();
          location.replace(thankyou.href);
        } else {
          throw new Error("送信に失敗しました");
        }
      } catch (err) {
        alert(
          "大変申し訳ございません。送信に失敗しました。再度お試しください。"
        );
        submitBtn.disabled = false;
        // ローディングは必ず閉じる
        loading.classList.add("invisible");
      }
    });

  /**
   * 入力データの収集
   * @returns {Object} formData
   */
  function collectFormData() {
    const form = document.getElementById("multiStepForm");
    const inputs = form.querySelectorAll("input");
    const formData = {};
    const params = new URLSearchParams(window.location.search);

    inputs.forEach((input) => {
      const name = input.name;
      const value = input.value.trim();

      if (!name) return; // name属性がない場合はスキップ

      if (input.type === "checkbox") {
        const keyName = name.replace(/\[\]$/, ""); // [] を削除
        if (!formData[keyName]) formData[keyName] = [];
        if (input.checked) formData[keyName].push(value);
      } else if (input.type === "radio") {
        if (input.checked) formData[name] = value;
      } else {
        formData[name] = value;
      }
    });

    const utmSource =
      new URLSearchParams(window.location.search).get("utm_source") || "";
    const nowPlatform =
      new URLSearchParams(window.location.search).get("platform") || "";

    //広告媒体を取得する
    switch (nowPlatform) {
      case "meta":
        formData.adMedia = "meta";
        formData.metaPlatform = utmSource;
        formData.utmSource = utmSource;
        formData.metaAdId = params.get("utm_ad_id") || "";
        formData.metaCampaignId = params.get("utm_campaign_id") || "";
        formData.metaCampainName = params.get("utm_campaign") || "";

        break;
      case "google":
        formData.adMedia = "google";
        formData.utmSource = utmSource;
        formData.utmMedium = params.get("utm_medium") || "";
        formData.utmTerm = params.get("utm_term") || "";
        formData.matchtype = params.get("matchtype") || "";
        formData.device = params.get("device") || "";
        formData.gclid = params.get("gclid") || "";

        break;
      default:
        break;
    }

    formData.lpRoute = "ankert-mechanic-2";

    return formData;
  }

  /**
   * 初回起動
   */
  function init() {
    // 初期化
    updateSteps();

    const platform =
      new URLSearchParams(window.location.search).get("platform") || "";
    console.log(platform);

    if (platform == "meta") {
      fireGa4CvStartByMeta();
    } else if (platform == "google") {
      fireGa4CvStartByGoogle();
    }
  }

  /**
   * ラジオボタンを選択した際は次へ移動する
   */
  document.querySelectorAll(".form-radio").forEach((radio) => {
    radio.addEventListener("click", function () {
      currentPage++;
      updateSteps();
    });
  });

  /**
   * フォームのグレーアウトをリセットする
   */
  function backgroundReset() {
    const nextBtn = document.querySelector(".next-btn");
    const submitBtn = document.getElementById("submit-btn");

    const formScreen = document.querySelector(".form-screen");

    submitBtn.classList.remove("highlight");
    formScreen.classList.remove("dimmed");
    nextBtn.classList.remove("highlight");
  }

  /**
   * ハンドアイコンを初期の位置に戻す
   */
  function handReset() {
    const hand = document.getElementById("hand-icon");
    // ✅ hand-icon を初期位置に戻す
    hand.style.left = `0px`;
    hand.style.top = `20px`;
  }

  /**
   *チェックボックスとラジオボタンをチェックする
   */
  function checkCheckboxAndRadioForm(currentPage) {
    console.log("checkCheckboxAndRadioForm start");
    console.log(currentPage);
    const targetStep = document.getElementById(`form-step-${currentPage}`);
    console.log(targetStep);

    //チェックボックス
    if (targetStep.querySelector(".form-checkbox")) {
      console.log("このステップにはチェックボックスがあります");
      let nextBtn = document.querySelector(".next-btn");
      let formScreen = document.querySelector(".form-screen");

      const isChecked = [...targetStep.querySelectorAll(".form-checkbox")].some(
        (cb) => cb.checked
      );

      if (isChecked) {
        formScreen.classList.add("dimmed");
        nextBtn.classList.add("highlight");
        addDecorationAfterInputComplete();
        nextBtnInvalidationCancel();
        targetBtnScroll("next-btn");
      } else {
        formScreen.classList.remove("dimmed");
        nextBtn.classList.remove("highlight");
        handReset();
        nextBtnDisabled();
      }
    }

    //ラジオボタン
    if (targetStep.querySelector(".form-radio")) {
      console.log("このステップにはラジオボタンがあります");
      let nextBtn = document.querySelector(".next-btn");
      let formScreen = document.querySelector(".form-screen");

      const isChecked = [...targetStep.querySelectorAll(".form-radio")].some(
        (cb) => cb.checked
      );

      formScreen.classList.remove("dimmed");
      nextBtn.classList.remove("highlight");
      handReset();
      //   if (isChecked) {
      //     formScreen.classList.add("dimmed");
      //     nextBtn.classList.add("highlight");
      //     addDecorationAfterInputComplete();
      //   } else {
      //   }
    }
  }

  /**
   *　チェックボックスにチェックが入った時のアクション（背景グレーアウト、ハンドアイコン移動）
   */
  document.querySelectorAll(".form-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const currentStep = checkbox.closest(".form-step"); // チェックボックスのあるステップを取得
      const nextBtn = document.querySelector(".next-btn");
      const formScreen = document.querySelector(".form-screen");

      const isChecked = [
        ...currentStep.querySelectorAll(".form-checkbox"),
      ].some((cb) => cb.checked);

      if (isChecked) {
        formScreen.classList.add("dimmed");
        nextBtn.classList.add("highlight");
        nextBtnInvalidationCancel();

        addDecorationAfterInputComplete();
      } else {
        formScreen.classList.remove("dimmed");
        nextBtn.classList.remove("highlight");
        handReset();
        nextBtnDisabled();
      }
    });
  });

  /***********************************************
   * フォーム1問目のバリデーションチェック
   *************************************************/

  /**
   * フォームの1問目のバリデーションチェック
   */
  function validateFormFirstQuestion() {}

  /***********************************************
   * フォーム2問目のバリデーションチェック
   *************************************************/

  /**
   * フォームの2問目のバリデーションチェック
   */
  function validateFormSecondQuestion() {}

  /***********************************************
   * フォーム3問目のバリデーションチェック
   *************************************************/

  // フォーム3問目の監視対象の要素を取得
  const zipCodeInput = document.getElementById("zip-code");
  const birthInput = document.getElementById("birth");
  const zipCodeCounter = document.getElementById("zip-code-counter");

  // イベント設定
  [zipCodeInput, birthInput].forEach((input) => {
    input.addEventListener("input", () => {
      if (validateFormThirdQuestion()) {
        addDecorationAfterInputComplete();
        nextBtnInvalidationCancel();
        targetBtnScroll("next-btn");
      } else {
        deleteDecorationAfterInputComplete();
        nextBtnDisabled();
      }
    });
  });

  /**
   * フォーム3問目のバリデーションチェック
   */
  function validateFormThirdQuestion() {
    let result = false;
    const zipCode = zipCodeInput.value.trim();
    const birth = birthInput.value.trim();
    const zipCodeLength = zipCode.length;

    if (zipCodeCounter) {
      zipCodeCounter.textContent = 7 - zipCodeLength;
    }

    // 郵便番号：7桁の数字、誕生年：4桁の数字
    const zipCodeValid = /^\d{7}$/.test(zipCode);
    const birthValid = /^\d{4}$/.test(birth);

    if (zipCodeValid && birthValid) {
      result = true;
    }

    return result;
  }

  /***********************************************
   * フォーム4問目のバリデーションチェック
   *************************************************/

  // フォーム4問目の監視対象の要素を取得
  const nameInput = document.getElementById("name");
  const telInput = document.getElementById("tel");
  const telCouter = document.getElementById("tel-counter");

  // イベント設定
  [nameInput, telInput].forEach((input) => {
    input.addEventListener("input", () => {
      const validate = validateFormFourQuestion();
      const isLastPage = true;
      if (validate.result) {
        addDecorationAfterInputComplete(isLastPage);
        submitBtnInvalidationCancel();
        targetBtnScroll("submit-btn");
      } else {
        deleteDecorationAfterInputComplete();
        submitBtnDisabled();
      }
    });
  });

  /**
   * フォームの4問目のバリデーションチェック
   */
  function validateFormFourQuestion() {
    let res = {
      result: true,
      msg: "",
    };

    const nameValue = document.getElementById("name").value.trim();
    const telValue = document.getElementById("tel").value.trim();
    const emailValue = document.getElementById("email").value.trim();

    const telLength = telValue.length;
    telCouter.textContent = 11 - telLength;

    // 名前が空でない
    const nameValid = nameValue.length > 0;

    // 電話番号: 数字のみで10桁または11桁
    const telValid = /^\d{11}$/.test(telValue);

    if (!nameValid) {
      res.result = false;
      return res;
    }

    if (!telValid) {
      res.result = false;
      res.msg = "正しい電話番号を入力してください";
      return res;
    }

    if (emailValue.length > 0) {
      if (!isValidEmail(emailValue)) {
        res.result = false;
        res.msg = "正しいメールアドレスを入力してください";
        return res;
      }
    }

    return res;
  }

  /**
   * メールアドレスのバリデーション
   * @param {*} email
   * @returns boolean
   */
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  /**
   * フォーム入力後の装飾を追加する
   */
  function addDecorationAfterInputComplete(islastPage = false) {
    console.log("addDecorationAfterInputComplete start");
    const formScreen = document.querySelector(".form-screen");
    formScreen.classList.add("dimmed");

    let targetBtn = null;
    if (islastPage) {
      targetBtn = document.getElementById("submit-btn");
    } else {
      const nextBtn = document.getElementById("next-btn");
      if (nextBtn.classList.contains("invisible")) {
        handReset();
        console.log("次へボタンは非表示です");
        return;
      }

      targetBtn = nextBtn;
    }

    if (targetBtn == null) {
      console.log("ターゲットボタンが見つかりません");
      return;
    }

    targetBtn.classList.add("highlight");

    const targetBtnRect = targetBtn.getBoundingClientRect();
    const wrapperRect = document
      .querySelector(".form-wrapper")
      .getBoundingClientRect();

    const offsetX = -30;
    const offsetY = -20;

    const x = targetBtnRect.right - wrapperRect.left + offsetX;
    const y = targetBtnRect.bottom - wrapperRect.top + offsetY;

    const hand = document.getElementById("hand-icon");

    hand.style.position = "absolute";
    hand.style.left = `${x}px`;
    hand.style.top = `${y}px`;
    hand.style.display = "block";

    console.log("addDecorationAfterInputComplete end");
  }

  /**
   * フォーム入力後の装飾を削除する
   */
  function deleteDecorationAfterInputComplete() {
    backgroundReset();
    handReset();
  }

  /**
   * 次へボタンの無効化を解除する
   */
  function nextBtnInvalidationCancel() {
    const nextBtn = document.getElementById("next-btn");
    nextBtn.classList.remove("disabled");
  }

  /**
   * 次へボタンを無効化する
   */
  function nextBtnDisabled() {
    const nextBtn = document.getElementById("next-btn");
    nextBtn.classList.remove("disabled");
    nextBtn.classList.add("disabled");
  }

  /**
   * 送信ボタンを無効化する
   */
  function submitBtnDisabled() {
    const submitBtn = document.getElementById("submit-btn");
    submitBtn.classList.remove("disabled");
    submitBtn.classList.add("disabled");
  }

  /**
   * 送信ボタンの無効化を解除する
   */
  function submitBtnInvalidationCancel() {
    const submitBtn = document.getElementById("submit-btn");
    submitBtn.classList.remove("disabled");
  }

  /**
   * ターゲットのボタンまでスクロールする
   * @param {} target
   * @returns
   */
  function targetBtnScroll(target) {
    if (!target) {
      return;
    }
    document.getElementById(target).scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  }

  const track = document.querySelector(".slider-track");
  const wrapper = document.querySelector(".slider-wrapper");
  if (!track || !wrapper) return;

  // 元のスライドを保存
  const original = Array.from(track.children).map((n) => n.cloneNode(true));

  function setupSeamless() {
    // 一旦リセット
    track.innerHTML = "";
    // まず「半分(=繰り返し単位)」を作る：最低でもラッパー幅を満たすまで複製
    original.forEach((n) => track.appendChild(n.cloneNode(true)));
    let halfCount = track.children.length;
    while (track.scrollWidth < wrapper.clientWidth) {
      original.forEach((n) => track.appendChild(n.cloneNode(true)));
      halfCount = track.children.length;
    }

    // 今の先頭〜halfCount が「前半」。これをそのまま複製して「後半」にする
    for (let i = 0; i < halfCount; i++) {
      const clone = track.children[i].cloneNode(true);
      clone.setAttribute("aria-hidden", "true"); // アクセシビリティ配慮
      track.appendChild(clone);
    }

    // 距離（=トラック幅の半分）から速度に応じて時間を算出（px/s）
    const distance = track.scrollWidth / 2;
    const speedPxPerSec = 80; // 速度は好みで。数値↑で速く
    const durationSec = distance / speedPxPerSec;
    track.style.setProperty("--marquee-duration", `${durationSec}s`);
  }

  // 初期化＆リサイズ対応（連打抑制）
  setupSeamless();
  let t;
  window.addEventListener("resize", () => {
    clearTimeout(t);
    t = setTimeout(setupSeamless, 200);
  });

  /**
   * コンバージョン発火する
   * @param {number} step
   */
  function fireConversion(step) {
    const uTmMedium =
      new URLSearchParams(window.location.search).get("utm_medium") || "";
    const platform =
      new URLSearchParams(window.location.search).get("platform") || "";

    console.log("fireConversion");
    console.log(platform);
    console.log(uTmMedium);
    console.log(step);

    if (step == 1) {
      switch (platform) {
        case "meta":
          fireGa4CvZeroByMeta();
          break;
        case "google":
          switch (uTmMedium) {
            case "display":
              fireGoogleConversionZeroByDisplay();
              break;
            case "search":
              fireGoogleConversionZeroBySearch();
              fireGa4CvZeroByGoogle();
              break;
            default:
              break;
          }

          break;
        default:
          break;
      }
    } else if (step == 2) {
      switch (platform) {
        case "meta":
          fireGa4CvFirstByMeta();
          break;
        case "google":
          switch (uTmMedium) {
            case "display":
              fireGoogleConversionFirstByDisplay();
              break;
            case "search":
              fireGoogleConversionFirstBySearch();
              fireGa4CvFirstByGoogle();
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
    } else if (step == 3) {
      switch (platform) {
        case "meta":
          fireGa4CvSecondByMeta();
          break;
        case "google":
          switch (uTmMedium) {
            case "display":
              fireGoogleConversionSecondByDisplay();
              break;
            case "search":
              fireGoogleConversionSecondBySearch();
              fireGa4CvSecondByGoogle();
              break;
            default:
              break;
          }

          break;
        default:
          break;
      }
    } else if (step == 4) {
      switch (platform) {
        case "meta":
          fireGa4CvThirdByMeta();
          break;
        case "google":
          switch (uTmMedium) {
            case "display":
              fireGoogleConversionThirdByDisplay();
              break;
            case "search":
              fireGoogleConversionThirdBySearch();
              fireGa4CvThirdByGoogle();
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
    }
  }

  /***************************************
   * google検索広告用のコンバージョンタグ
   ***************************************/

  /**
   * googleコンバージョン0を発火する(お気持ちはどちらに近い？)
   */
  function fireGoogleConversionZeroBySearch() {
    if (isTest) {
      return;
    }

    gtag("event", "conversion", {
      send_to: "AW-16680263633/BeUaCNbB-IYbENG_4pE-",
      value: 0.0,
      currency: "JPY",
    });
  }

  /**
   * googleコンバージョン１を発火する（どんな資格をお持ちですか？）
   */
  function fireGoogleConversionFirstBySearch() {
    if (isTransitedFirstPage || isTest) {
      return;
    }

    gtag("event", "conversion", {
      send_to: "AW-16680263633/7wPwCOyP64YbENG_4pE-",
      value: 0.0,
      currency: "JPY",
    });

    isTransitedFirstPage = true;
  }

  /**
   * googleコンバージョン2を発火する（現在の年収）
   */
  function fireGoogleConversionSecondBySearch() {
    if (isTransitedSecondPage || isTest) {
      return;
    }

    gtag("event", "conversion", {
      send_to: "AW-16680263633/0w__CNPB-IYbENG_4pE-",
      value: 0.0,
      currency: "JPY",
    });

    isTransitedSecondPage = true;
  }

  /**
   * googleコンバージョン3を発火する（個人情報１）
   */
  function fireGoogleConversionThirdBySearch() {
    if (isTransitedThreePage || isTest) {
      return;
    }

    gtag("event", "conversion", {
      send_to: "AW-16680263633/tZL5CNnB-IYbENG_4pE-",
      value: 0.0,
      currency: "JPY",
    });

    isTransitedThreePage = true;
  }

  /**
   * googleコンバージョン4を発火する（※登録になるので、ここは発火なし）
   */
  function fireGoogleConversionFourBySearch() {
    if (isTransitedFourPage || isTest) {
      return;
    }

    gtag("event", "conversion", {
      send_to: "AW-16680263633/wI2eCNzB-IYbENG_4pE-",
      value: 0.0,
      currency: "JPY",
    });

    isTransitedFourPage = true;
  }

  /***************************************
   * googleディスプレイ広告用のコンバージョンタグ
   ***************************************/
  /**
   * googleコンバージョン0を発火する(お気持ちはどちらに近い？)
   */
  function fireGoogleConversionZeroByDisplay() {
    console.log("fireGoogleConversionZeroByDisplay");
    if (isTest) {
      console.log("return");
      return;
    }
    gtag("event", "conversion", {
      send_to: "AW-16680263633/Jn76CIaVgpAbENG_4pE-",
      value: 0.0,
      currency: "JPY",
    });
  }

  /**
   * googleコンバージョン１を発火する（どんな資格をお持ちですか？）
   */
  function fireGoogleConversionFirstByDisplay() {
    if (isTransitedFirstPage || isTest) {
      return;
    }
    gtag("event", "conversion", {
      send_to: "AW-16680263633/fbVNCImVgpAbENG_4pE-",
      value: 0.0,
      currency: "JPY",
    });

    isTransitedFirstPage = true;
  }

  /**
   * googleコンバージョン2を発火する（年収）
   */
  function fireGoogleConversionSecondByDisplay() {
    if (isTransitedSecondPage || isTest) {
      return;
    }
    gtag("event", "conversion", {
      send_to: "AW-16680263633/_e8XCIyVgpAbENG_4pE-",
      value: 10.0,
      currency: "JPY",
    });

    isTransitedSecondPage = true;
  }

  /**
   * googleコンバージョン3を発火する（個人情報１）
   */
  function fireGoogleConversionThirdByDisplay() {
    if (isTransitedThreePage || isTest) {
      return;
    }
    gtag("event", "conversion", {
      send_to: "AW-16680263633/A71aCI-VgpAbENG_4pE-",
      value: 100.0,
      currency: "JPY",
    });

    isTransitedThreePage = true;
  }

  /**
   * googleコンバージョン4を発火する（※登録になるので、ここは発火なし）
   */
  function fireGoogleConversionFourByDisplay() {
    if (isTransitedFourPage || isTest) {
      return;
    }
    gtag("event", "conversion", {
      send_to: "AW-16680263633/sdQiCJKVgpAbENG_4pE-",
      value: 200.0,
      currency: "JPY",
    });

    isTransitedFourPage = true;
  }

  /***************************************
   * ga4用のコンバージョンタグ（meta広告用）
   ***************************************/

  /**
   * ga4CVの計測を開始する（フォーム開始）
   */
  function fireGa4CvStartByMeta() {
    console.log("fireGa4CvStartByMeta");
    if (isTest) {
      console.log("return");
      return;
    }

    console.log("fire fireGa4CvStartByMeta");

    gtag("event", "mechanic_ankert_v1_form_start", {
      event_category: "form",
      event_label: "mechanic_ankert_v1",
    });
  }

  /**
   * ga4CV0を発火する(お気持ちはどちらに近い？)
   */
  function fireGa4CvZeroByMeta() {
    console.log("fireGa4CvZeroByMeta");
    if (isTest) {
      console.log("return");
      return;
    }

    console.log("fire fireGa4CvZeroByMeta");

    gtag("event", "mechanic_ankert_v1_0", {
      event_category: "form",
      event_label: "mechanic_ankert_v1",
    });
  }
  /**
   * ga4CV1を発火する(どんな資格をお持ちですか？)
   */
  function fireGa4CvFirstByMeta() {
    console.log("fireGa4CvFirstByMeta");
    if (isTransitedFirstPage || isTest) {
      console.log("return");
      return;
    }

    console.log("fire fireGa4CvFirstByMeta");

    gtag("event", "mechanic_ankert_v1_1", {
      event_category: "form",
      event_label: "mechanic_ankert_v1",
    });

    isTransitedFirstPage = true;
  }

  /**
   * ga4CV2を発火する（年収）
   */
  function fireGa4CvSecondByMeta() {
    console.log("fireGa4CvSecondByMeta");
    if (isTransitedSecondPage || isTest) {
      console.log("return");
      return;
    }

    console.log("fire fireGa4CvSecondByMeta");

    gtag("event", "mechanic_ankert_v1_2", {
      event_category: "form",
      event_label: "mechanic_ankert_v1",
    });

    isTransitedSecondPage = true;
  }

  /**
   * ga4CV3を発火する(（個人情報１）)
   */
  function fireGa4CvThirdByMeta() {
    console.log("fireGa4CvThirdByMeta");
    if (isTransitedThreePage || isTest) {
      console.log("return");
      return;
    }

    console.log("fire fireGa4CvThirdByMeta");

    gtag("event", "mechanic_ankert_v1_3", {
      event_category: "form",
      event_label: "mechanic_ankert_v1",
    });

    isTransitedThreePage = true;
  }

  /**
   * ga4-Submitを発火する(フォーム登録)
   */
  function fireGa4CvSubmitByMeta() {
    console.log("fireGa4CvSubmitByMeta");
    if (isTest) {
      console.log("return");
      return;
    }

    console.log("fire fireGa4CvSubmitByMeta");

    gtag("event", "mechanic_ankert_v1_submit", {
      event_category: "form",
      event_label: "mechanic_ankert_v1",
    });
  }

  /***************************************
   * ga4用のコンバージョンタグ（google広告用）
   ***************************************/

  /**
   * ga4CVの計測を開始する（フォーム開始）
   */
  function fireGa4CvStartByGoogle() {
    console.log("fireGa4CvStartByGoogle");
    if (isTest) {
      console.log("return");
      return;
    }

    console.log("fire fireGa4CvStartByGoogle");

    gtag("event", "mechanic_ankert_v1_form_start_by_google_l", {
      event_category: "form_by_google_l",
      event_label: "mechanic_ankert_v1_by_google_l",
    });
  }

  /**
   * ga4CV0を発火する(お気持ちはどちらに近い？)
   */
  function fireGa4CvZeroByGoogle() {
    console.log("fireGa4CvZeroByGoogle");
    if (isTest) {
      console.log("return");
      return;
    }

    console.log("fire fireGa4CvZeroByGoogle");

    gtag("event", "mechanic_ankert_v1_0_by_google_l", {
      event_category: "form_by_google_l",
      event_label: "mechanic_ankert_v1_by_google_l",
    });
  }
  /**
   * ga4CV1を発火する(どんな資格をお持ちですか？)
   */
  function fireGa4CvFirstByGoogle() {
    console.log("fireGa4CvFirstByGoogle");
    if (isTransitedFirstPage || isTest) {
      console.log("return");
      return;
    }

    console.log("fire fireGa4CvFirstByGoogle");

    gtag("event", "mechanic_ankert_v1_1_by_google_l", {
      event_category: "form_by_google_l",
      event_label: "mechanic_ankert_v1_by_google_l",
    });

    isTransitedFirstPage = true;
  }

  /**
   * ga4CV2を発火する（年収）
   */
  function fireGa4CvSecondByGoogle() {
    console.log("fireGa4CvSecondByGoogle");
    if (isTransitedSecondPage || isTest) {
      console.log("return");
      return;
    }

    console.log("fire fireGa4CvSecondByGoogle");

    gtag("event", "mechanic_ankert_v1_2_by_google_l", {
      event_category: "form_by_google_l",
      event_label: "mechanic_ankert_v1_by_google_l",
    });

    isTransitedSecondPage = true;
  }

  /**
   * ga4CV3を発火する(（個人情報１）)
   */
  function fireGa4CvThirdByGoogle() {
    console.log("fireGa4CvThirdByGoogle");
    if (isTransitedThreePage || isTest) {
      console.log("return");
      return;
    }

    console.log("fire fireGa4CvThirdByGoogle");

    gtag("event", "mechanic_ankert_v1_3_by_google_l", {
      event_category: "form_by_google_l",
      event_label: "mechanic_ankert_v1_by_google_l",
    });

    isTransitedThreePage = true;
  }

  /**
   * ga4-Submitを発火する(フォーム登録)
   */
  function fireGa4CvSubmitByGoogle() {
    console.log("fireGa4CvSubmitByGoogle");
    if (isTest) {
      console.log("return");
      return;
    }

    console.log("fire fireGa4CvSubmitByGoogle");

    gtag("event", "mechanic_ankert_v1_submit_by_google_l", {
      event_category: "form_by_google_l",
      event_label: "mechanic_ankert_v1_by_google_l",
    });
  }
});
