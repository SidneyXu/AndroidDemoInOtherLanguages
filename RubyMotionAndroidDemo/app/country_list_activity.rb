class RequestListener
  attr_accessor :activity

  def initialize(activity)
    @activity = activity
  end

  def onResponse(json)
    @activity.update_display(json)
  end
end

class ClickListener

  attr_accessor :activity
  attr_accessor :items

  def initialize(activity, items)
    @activity = activity
    @items = items
  end

  def onItemClick(parent, view, pos, id)
    Android::Widget::Toast.makeText(activity, @items[pos], 0).show()
  end
end

class CountryListActivity < Android::App::Activity
  def onCreate(savedInstanceState)
    super

    @list = Android::Widget::ListView.new(self)
    self.contentView = @list

    @dialog = Android::App::ProgressDialog.new(self)
    @dialog.show

    fetch_country
  end

  def request_queue
    @request_queue ||= Com::Android::Volley::Toolbox::Volley.newRequestQueue(self)
  end

  def fetch_country
    url = 'http://restcountries.eu/rest/v1/all'
    listener = RequestListener.new(self)
    get = Com::Android::Volley::Toolbox::JsonArrayRequest.new(url, listener, nil)
    request_queue.add(get)
  end

  def update_display(json)
    names =[]
    len = json.length - 1
    for i in 0..len
      names << json.getJSONObject(i).getString('name')
    end

    apt = Android::Widget::ArrayAdapter.new(self,
                                            Android::R::Layout::Simple_list_item_1,
                                            names)
    @list.adapter = apt
    @list.onItemClickListener = ClickListener.new(self, names)

    @dialog.dismiss
  end

end
