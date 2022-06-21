class Order {
    //Getters
    get titlePage () {return $('#header_container > div.header_secondary_container > span')}
    get backBtn () {return $('#back-to-products')}
    get botImg () {return $('#checkout_complete_container > img')}
    get h2Text () {return $('#checkout_complete_container > h2')}
    //Methods
}

module.exports = new Order();