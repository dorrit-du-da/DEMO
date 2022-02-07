# Smart Commerce And Token Management DEMO

This Smart Commerce And Token Management Platform demo is a preliminary prototype showing how to use Daml to build a DLT application. 


# Step of running locally
To start the daml backend + daml sandbox
run "daml start" in the Terminal

To start the UI frontend
run npm install for first time
run "npm start" in the seperate Terminal

# Parties in ledger
{
  operator: "PlatformOperator",
  intMerchant1:"MerchandiseService",
  intMerchant2:"CreditCardService",
  intMerchant3:"VoucherService",
  intMerchant4:"DigitalProductService",
  extMerchant1:"Partner1",
  extMerchant2:"Partner2",
  extMerchant3:"Partner3",
  extMerchant4:"Partner4",
  customer1:"Alice",
  customer2:"Bob",
  customer3:"Charlie"
}

# Example of JWT
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL2RhbWwuY29tL2xlZGdlci1hcGkiOnsibGVkZ2VySWQiOiJkYS1tYXJrZXRwbGFjZS1zYW5kYm94IiwiYXBwbGljYXRpb25JZCI6InNlMmxpZmUiLCJhZG1pbiI6dHJ1ZSwiYWN0QXMiOlsiUGxhdGZvcm1PcGVyYXRvciJdLCJyZWFkQXMiOlsiUGxhdGZvcm1PcGVyYXRvciIsIlB1YmxpYyJdfSwiaWF0IjoxNjQ0MjIyMzQyfQ.MMYvhRGmN_XIitoFYv2ouYb5JqVtG75ruAG2vSgKMfc
Please update the ledgerId correspondingly
