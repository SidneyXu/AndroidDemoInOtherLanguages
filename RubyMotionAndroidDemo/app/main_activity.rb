class MainActivity < Android::Support::V7::App::AppCompatActivity
  def onCreate(savedInstanceState)
    puts "Hello World!"

    setContentView(resources.getIdentifier('activity_main', 'layout', packageName))

    @button = findViewById(resources.getIdentifier('button1', 'id', packageName))
    @button.onClickListener = self
  end

  def onClick(view)
    intent = Android::Content::Intent.new(self, CountryListActivity)
    startActivity(intent)
  end

end
