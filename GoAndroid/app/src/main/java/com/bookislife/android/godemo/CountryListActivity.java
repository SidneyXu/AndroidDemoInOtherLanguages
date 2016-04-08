package com.bookislife.android.godemo;

import android.app.ProgressDialog;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;
import android.widget.Toast;
import go.hello.Hello;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;


/**
 * Created by SidneyXu on 2016/03/29.
 */
public class CountryListActivity extends AppCompatActivity {

    public interface FindCallback {
        void onComplete(List<String> names, Exception e);
    }

    private ExecutorService service = Executors.newSingleThreadExecutor();

    @Override
    protected void onCreate(final Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        final ListView listView = new ListView(this);
        setContentView(listView);
        final ProgressDialog progressDialog = new ProgressDialog(this);
        progressDialog.setProgressStyle(ProgressDialog.STYLE_SPINNER);
        progressDialog.setCancelable(false);
        progressDialog.show();

        findCountries(new FindCallback() {
            @Override
            public void onComplete(final List<String> names, final Exception e) {
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        progressDialog.dismiss();
                        if (null != e) {
                            Toast.makeText(CountryListActivity.this, e.getMessage(), Toast.LENGTH_SHORT).show();
                            return;
                        }
                        Apt apt = new Apt(CountryListActivity.this, names);
                        listView.setAdapter(apt);
                        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                            @Override
                            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                                Toast.makeText(CountryListActivity.this, names.get(position), Toast.LENGTH_SHORT).show();
                            }
                        });
                    }
                });
            }
        });
    }

    private void findCountries(final FindCallback doneCallback) {

        service.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    String countries = Hello.GetCountries("https://restcountries.eu/rest/v1/all");
                    if ("error".equals(countries)) {
                        throw new Exception("Unable to get the response.");
                    }
                    List<String> names = new ArrayList<>();
                    String[] array = countries.split(",");
                    int length = array.length;
                    for (int i = 0; i < length; i++) {
                        names.add(array[i]);
                    }
                    doneCallback.onComplete(names, null);
                } catch (Exception e) {
                    doneCallback.onComplete(null, e);
                }
            }
        });
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        service.shutdown();
    }
}
