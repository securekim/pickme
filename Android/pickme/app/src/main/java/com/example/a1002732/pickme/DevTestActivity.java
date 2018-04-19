package com.example.a1002732.pickme;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.View;
import android.widget.Button;

/**
 * Created by 1002732 on 2018. 4. 19..
 */

public class DevTestActivity extends Activity implements View.OnClickListener{

    Button scouterBtn;
    Button userBtn;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.devtest);

        scouterBtn = (Button) findViewById(R.id.btn_scouter);
        userBtn = (Button) findViewById(R.id.btn_user);

        scouterBtn.setOnClickListener(this);
        userBtn.setOnClickListener(this);

    }

    @Override
    public void onClick(View v) {
        String account = "";
        String priKey = "";
        String id = "";
        switch (v.getId()){
            case R.id.btn_scouter:
                account = "0xCB3f76FAb25c223653a85513D2ca42BAB68D1B21";
                priKey = "b22563a7e548bf55fb6b230ef1733cd16f9b9a900a68c3258a0e922547a621c3";
                id = "jaesuk";
                break;
            case R.id.btn_user:
                account = "0x731A765DFF550d11B7C880Af145066BC1bDD3127";
                priKey = "2269b98525af6803b23779eefee1d1ee7293547cca8cb14f1ca12df9bfbfb7f5";
                id = "yoojung";
                break;
            default:
        }

        Intent intent = new Intent(getApplicationContext(), PickMeActivity.class);
        intent.putExtra("account",account);
        intent.putExtra("priKey",priKey);
        intent.putExtra("id",id);

        startActivity(intent);
        finish();
    }
}
