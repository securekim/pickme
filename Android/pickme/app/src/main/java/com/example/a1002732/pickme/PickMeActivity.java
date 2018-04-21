package com.example.a1002732.pickme;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.support.annotation.Nullable;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

/**
 * Created by 1002732 on 2018. 4. 15..
 */



@SuppressLint({ "SetJavaScriptEnabled", "JavascriptInterface" })
public class PickMeActivity extends Activity {
    private WebView mWebView;

    String priKey="";
    String account="";
    String id="";

    private final Handler handler = new Handler();
    final Context context = this;

    @SuppressLint("JavascriptInterface")
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.pickme);

        priKey = getIntent().getStringExtra("priKey");
        account = getIntent().getStringExtra("account");
        id = getIntent().getStringExtra("id");


        mWebView = (WebView) findViewById(R.id.pickmeWebView);
        WebSettings settings = mWebView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        settings.setSupportZoom(true);
        settings.setBuiltInZoomControls(false);
        settings.setLayoutAlgorithm(WebSettings.LayoutAlgorithm.SINGLE_COLUMN);
        settings.setCacheMode(WebSettings.LOAD_NO_CACHE);
        settings.setDomStorageEnabled(true);
        mWebView.setScrollBarStyle(WebView.SCROLLBARS_OUTSIDE_OVERLAY);
        mWebView.setScrollbarFadingEnabled(true);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            mWebView.setLayerType(View.LAYER_TYPE_HARDWARE, null);
        } else {
            mWebView.setLayerType(View.LAYER_TYPE_SOFTWARE, null);
        }


        mWebView.addJavascriptInterface(new PickMeActivity.AndroidBridge(), "android");
        mWebView.loadUrl("http://172.30.1.24:8080/");
        mWebView.setWebViewClient(new WebViewClient() {

            @Override
            public void onPageFinished(WebView view, String url) {

                view.loadUrl("javascript:setLoginInfo(\""+priKey+"\",\""+account+"\",\""+id+"\")");
            }
        });
    }
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event){
        if((keyCode == KeyEvent.KEYCODE_BACK) && mWebView.canGoBack() ){
            mWebView.goBack();
            return true;
        }

        //백할 페이가 없다면
        if ((keyCode == KeyEvent.KEYCODE_BACK) && (mWebView.canGoBack() == false)){


            //다이아로그박스 출력
            new AlertDialog.Builder(this)
                    .setMessage("프로그램을 종료하시겠습니까?")
                    .setPositiveButton("예", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            android.os.Process.killProcess(android.os.Process.myPid());
                        }
                    })
                    .setNegativeButton("아니오",  null).show();
        }

        return super.onKeyDown(keyCode, event);
    }

    private class AndroidBridge {

        @JavascriptInterface
        public void setMessage(final String arg) {

            handler.post(new Runnable() {
                public void run() {
                }
            });
        }
    }

}
