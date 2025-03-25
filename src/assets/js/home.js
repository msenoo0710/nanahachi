/* /////////////////////////////////////////////////////////
    home.js
///////////////////////////////////////////////////////// */
(function($){
    $(function(){


        // ヘッダー背景
        var headerCL = new ScrollMagic.Controller();
        var scene = new ScrollMagic.Scene({
            triggerElement: '.mainvisual', // トリガーとなる要素
            duration: $('.mainvisual').outerHeight()*3, // .mainvisualの高さ
            triggerHook: 0.3, // ページの上端でトリガー
        })
        .on('leave', function () {
            // .headerに.currentクラスを追加
            $('.header').addClass('current');
        })
        .on('enter', function () {
            // .headerから.currentクラスを削除
            $('.header').removeClass('current');
        })
        // コントローラーにシーンを追加
        .addTo(headerCL);


        // メインビジュアルアニメーション
        var mainvisualCL = new ScrollMagic.Controller();
        var mainvisualHeight = $('.mainvisual').outerHeight();
        var duration = mainvisualHeight / 2; // アニメーションの期間を.mainvisualの高さの半分に設定

        // .mainvisualをピン留め
        var pinScene = new ScrollMagic.Scene({
                triggerElement: '.mainvisual',
                duration: mainvisualHeight * 2,
                triggerHook: 0,
            })
            .setPin('.mainvisual')
            .addTo(mainvisualCL);

        // .mainvisual__headingのフェードアウト
        var headingFadeOut = new ScrollMagic.Scene({
                triggerElement: '.mainvisual',
                duration: duration,
                triggerHook: 0,
            })
            .on('progress', function(e) {
                var opacity = 1 - e.progress; // 0から1までの進行に基づいて透明度を計算
                $('.mainvisual__heading').velocity({opacity: opacity}, {duration: 0, queue: false});
            })
            .addTo(mainvisualCL);

        // .mainvisual__contentのフェードイン
        var contentFadeIn = new ScrollMagic.Scene({
                triggerElement: '.mainvisual',
                duration: duration,
                offset: duration, // .mainvisualの高さの半分から開始
                triggerHook: 0,
            })
            .on('progress', function(e) {
                var opacity = e.progress; // 0から1までの進行に基づいて透明度を計算
                $('.mainvisual__content').velocity({opacity: opacity}, {duration: 0, queue: false});
            })
            .addTo(mainvisualCL);

        // 背景スライド
        $('.mainvisual__background--slider').slick({
            slidesToShow: 1,           // 一度に表示するスライド数
            slidesToScroll: 1,         // スクロールするスライド数
            autoplay: true,            // 自動再生
            autoplaySpeed: 3000,       // スライドが切り替わるまでの時間（ミリ秒）
            fade: true,                // フェード効果を有効に
            arrows: false,             // 矢印を非表示
            dots: true,                // ドットナビゲーションの表示
            infinite: true             // 無限ループ
        });
        
        // カルーセル
        // $('.mod__slider__carousel').slick(
        //     {
        //         infinite: false,
        //         slidesToShow: 4,
        //         slidesToScroll: 4,
        //         responsive: [
        //             {
        //                 breakpoint: 768,
        //                 settings: {
        //                     slidesToShow: 1,
        //                     slidesToScroll: 1
        //                 }
        //             }
        //         ]
        //     }
        // );

    });
})(jQuery);

