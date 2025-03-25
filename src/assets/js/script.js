/* /////////////////////////////////////////////////////////
  script.js
///////////////////////////////////////////////////////// */
(function($){
  $(function(){

    // スクロールイベントの監視を追加
    $(window).scroll(function() {
      var $header = $(".header");
      var $pagetop = $('.footer__pagetop');
      if ($(this).scrollTop() > 200) {
        $pagetop.addClass('scrolled');
      } else {
        $pagetop.removeClass('scrolled');
      }
    });

    // ページトップに戻る
    $('.footer__pagetop').on('click', function(e) {
      e.preventDefault();
      // ここでページトップにスクロールするアニメーションを実行します
      $("html, body").css('overflow-x', 'hidden'); // スクロール前にoverflow-xをhiddenに設定
      $("html, body").animate({
          scrollTop: 0 // ページのトップに移動
      }, 800, 'swing', function() {
          $("html, body").css('overflow-x', ''); // スクロール完了後に設定を解除
      });
    });

    // マウスホバーで子メニューを表示する
    $('.header__nav .child').hover(function() {
      // マウスが要素に入った時の処理
      $(this).find('ol').velocity("slideDown", {
          duration: 300 // アニメーションの速度をミリ秒単位で指定
      });
    }, function() {
      // マウスが要素から出た時の処理
      $(this).find('ol').velocity("slideUp", {
          duration: 300 // アニメーションの速度をミリ秒単位で指定
      });
    });

    // ハンバーガーメニュー
    $(".header__hamburger-bars").click(function () {
      var $header = $(".header");
      var $headerWrap = $(".header__wrap");
      var $mobileMenu = $(".header__mobile");
      var $body = $("body");
      $(this).toggleClass('active');

      if ($mobileMenu.css('display') === 'none') {
        $mobileMenu.velocity("slideDown", {
          duration: 300,
          begin: function(elements) {
            var headerHeight = $headerWrap.outerHeight();
          },
          complete: function(elements) {
            $body.css('overflow', 'hidden');
            $mobileMenu.find('.header__mobile-content').velocity({ opacity: 1 }, { duration: 300 });
          }
        });
      } else {
        $mobileMenu.find('.header__mobile-content').velocity({ opacity: 0 }, { duration: 0 });
        $mobileMenu.velocity("slideUp", {
          duration: 200,
          complete: function(elements) {
            $(elements).css('display', 'none');
            $body.css('overflow', '');
          }
        });
      }
    });


    // アニメーションさせたい要素をすべて選択
    var ScrollCL = new ScrollMagic.Controller();
    $('.js-fadeUp').each(function() {
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
    $('.js-fadeIn').each(function() {
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


    //アンカーリンク
    $('.header__nav-item a[href^="#"]').on('click', function(e) {
      e.preventDefault();
      var target = $($(this).attr('href'));
      if (target.length) {
          var headerHeight = $('.header').outerHeight(); // ヘッダーの高さを取得
          $("html, body").css('overflow-x', 'hidden'); // スクロール前にoverflow-xをhiddenに設定
          $("html, body").velocity("scroll", {
              duration: 800,
              // ヘッダーの高さを考慮したオフセット値
              // offset: target.offset().top - headerHeight,
              offset: target.offset().top,
              easing: "ease-in-out",
              complete: function() {
                  var $header = $(".header");
                  var $headerWrap = $(".header__wrap");
                  var $mobileMenu = $(".header__mobile");
                  var $body = $("body");
                  $(".header__hamburger-bars").removeClass('active');
                  $mobileMenu.find('.header__mobile-content').velocity({ opacity: 0 }, { duration: 0 });
                  $mobileMenu.velocity("slideUp", {
                    duration: 200,
                    complete: function(elements) {
                      $(elements).css('display', 'none');
                      $body.css('overflow', '');
                    }
                  });
              }
          });
      }
    });

    $('.header__mobile-nav-item a[href^="#"]').on('click', function(e) {
      e.preventDefault();
      var target = $($(this).attr('href'));
      if (target.length) {
          // アニメーションなしで指定位置までスクロール
          $('html, body').css('overflow-x', 'hidden'); // スクロール前にoverflow-xをhiddenに設定
          $('html, body').scrollTop(target.offset().top); // スクロール位置を設定
          $('html, body').css('overflow', ''); // スクロール後にoverflow-xを元に戻す
    
          // メニューを閉じる処理
          var $mobileMenu = $(".header__mobile");
          var $body = $("body");
          $(".header__hamburger-bars").removeClass('active');
          $mobileMenu.find('.header__mobile-content').css({ opacity: 0 });
          $mobileMenu.slideUp(0, function() {
            $(this).css('display', 'none');
            $body.css('overflow', '');
          });
      }
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
