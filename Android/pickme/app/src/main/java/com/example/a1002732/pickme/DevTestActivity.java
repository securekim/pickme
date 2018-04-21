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
    Button userBtn2;
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.devtest);

        scouterBtn = (Button) findViewById(R.id.btn_scouter);
        userBtn = (Button) findViewById(R.id.btn_user);
        userBtn2 = (Button) findViewById(R.id.btn_user2);
        scouterBtn.setOnClickListener(this);
        userBtn.setOnClickListener(this);
        userBtn2.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        String account = "";
        String priKey = "";
        String id = "";
        switch (v.getId()){
            case R.id.btn_scouter:
                account = "0x6f213a598be7058a4248eaf0a2593210fa8b71c3";
                priKey = "d816e5e0eab23dc5573968edaed1443787b03a5dddf4b82e48818ad3634a894a";
                id = "jaesuk";
                break;
            case R.id.btn_user:
                account = "0x731A765DFF550d11B7C880Af145066BC1bDD3127";
                priKey = "2269b98525af6803b23779eefee1d1ee7293547cca8cb14f1ca12df9bfbfb7f5";
                id = "yoojung";
                break;
            case R.id.btn_user2:
                account = "0x2D35e596B46b69F13a98cb3B05f06Cb58D7Fda23";
                priKey = "1b8edf20fbe0854e78249c2e053c4e35ef766f69d04e46a76ecd6b0db72ad891";
                id = "madongsuk";
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
