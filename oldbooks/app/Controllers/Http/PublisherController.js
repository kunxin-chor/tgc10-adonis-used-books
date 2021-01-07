'use strict'

// the use() function is strictly for Adonis only
const Publisher = use ('App/Models/Publisher')
const Country = use ('App/Models/Country')

class PublisherController {
  async index({view}) {
    let allPublishers = await Publisher.all();
    return view.render('publishers/index',{
      'publishers': allPublishers.toJSON()
    })
  }
  async show({params, view}) {
    let publisher = await Publisher.find(params.publisher_id)
    let books = await publisher.books().fetch()
    let country = await publisher.country().fetch()
    return view.render('publishers/show', {
      'publisher': publisher.toJSON(),
      'books': books.toJSON(),
      'country':country.toJSON()
    })
  }
  async create({view}) {
    let allCountries = await Country.all();

    return view.render('publishers/create', {
      'countries': allCountries.toJSON()
    })
  }
  async processCreate({request, response}) {
    // the form is embedded inside the request, so we need to
    // get the request object in the argument
    let formData = request.post();
    let newPublisher = new Publisher();
    newPublisher.name = formData.name;
    newPublisher.email = formData.email;
    newPublisher.country_id = formData.country;
    await newPublisher.save();
    response.route('show_all_publishers')
  }
  async update({view, params}) {
    // find the publisher that we want to update
    let publisher = await Publisher.find(params.publisher_id);
    return view.render('publishers/update', {
      publisher: publisher.toJSON()
    })
  }
  async processUpdate({request, response, params}) {
    // find the publisher that we want to update
    let publisher = await Publisher.find(params.publisher_id);
    let formData = request.post();
    publisher.name = formData.name;
    publisher.email = formData.email;
    publisher.save();
    response.route('show_all_publishers');
  }
  async delete({params, view}) {
    let publisher = await Publisher.find(params.publisher_id);
    return view.render('publishers/delete', {
      publisher: publisher.toJSON()
    })
  }
  async processDelete({params, response}) {
    let publisher = await Publisher.find(params.publisher_id);
    await publisher.delete();
    response.route('show_all_publishers')
  }
}

module.exports = PublisherController
