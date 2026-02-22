/* /////////////////////////////////////////////////////////
  script.js
///////////////////////////////////////////////////////// */
(function ($) {
  $(function () {

    // スクロールイベントの監視を追加
    $(window).scroll(function () {
      var $pagetop = $('.footer__pagetop');
      if ($(this).scrollTop() > 200) {
        $pagetop.addClass('scrolled');
      } else {
        $pagetop.removeClass('scrolled');
      }
    });

    // ページトップに戻る
    $('.footer__pagetop').on('click', function (e) {
      e.preventDefault();
      // ここでページトップにスクロールするアニメーションを実行します
      $("html, body").css('overflow-x', 'hidden'); // スクロール前にoverflow-xをhiddenに設定
      $("html, body").animate({
        scrollTop: 0 // ページのトップに移動
      }, 800, 'swing', function () {
        $("html, body").css('overflow-x', ''); // スクロール完了後に設定を解除
      });
    });

    // ページトップに戻るボタン位置調整
    const $pagetop = $('.footer__pagetop'); // ページトップボタン
    const $footer = $('.footer__info'); // フッター要素
    const stopBottom = 100; // 一番下で止めたい位置（画面下から100px）

    $(window).on('scroll resize', function () {
      const scrollTop = $(window).scrollTop();
      const windowHeight = $(window).height();
      const docHeight = $(document).height();
      const footerTop = $footer.offset().top;

      const distanceToBottom = docHeight - (scrollTop + windowHeight);

      if (scrollTop + windowHeight >= footerTop) {
        // フッターに到達したら bottom を 100px に固定
        $pagetop.css('bottom', `${stopBottom}px`);
      } else {
        // それ以外は初期値（例: 30px）
        $pagetop.css('bottom', `30px`);
      }
    });



    // アニメーションさせたい要素をすべて選択
    var ScrollCL = new ScrollMagic.Controller();
    $('.js-fadeUp').each(function () {
      // この要素のためのシーンを作成
      var scene = new ScrollMagic.Scene({
        triggerElement: this, // この要素がトリガー
        triggerHook: 0.9, // ビューポートの90%でトリガー
        reverse: false // アニメーションを1回だけ実行
      })
        .on('enter', () => {
          // Velocity.js を使用してアニメーション (jQueryメソッドを使用)
          $(this).velocity({ opacity: 1, translateY: 0 }, { duration: 500 });
        })
        // コントローラーにシーンを追加
        .addTo(ScrollCL);
    });
    $('.js-fadeIn').each(function () {
      // この要素のためのシーンを作成
      var scene = new ScrollMagic.Scene({
        triggerElement: this, // この要素がトリガー
        triggerHook: 0.7, // ビューポートの90%でトリガー
        reverse: false // アニメーションを1回だけ実行
      })
        .on('enter', () => {
          // Velocity.js を使用してアニメーション (jQueryメソッドを使用)
          $(this).velocity({ opacity: 1 }, { duration: 500 });
        })
        // コントローラーにシーンを追加
        .addTo(ScrollCL);
    });


    // ページ読み込み時にハッシュがあるか確認
    if (window.location.hash) {
      var target = $(window.location.hash);
      if (target.length) {
        $("html, body").css('overflow-x', 'hidden'); // スクロール前にoverflow-xをhiddenに設定
        $("html, body").scrollTop(target.offset().top); // アニメーションなしでスクロール
        $("html, body").css('overflow-x', ''); // スクロール後にoverflow-xを元に戻す
      }
    }


  });
})(jQuery);
