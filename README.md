# Smart Commerce And Token Management DEMO

This Smart Commerce And Token Management Platform demo is a preliminary prototype showing how to use Daml to build a DLT application. 


# Step of running locally
To start the daml backend + daml sandbox
run "daml start" in the Terminal

To start the UI frontend
1. run "npm install" for first time
2. run "npm start" in the seperate Terminal

# Parties in ledger
1. operator: "PlatformOperator"
2. intMerchant1:"MerchandiseService"
3. intMerchant2:"CreditCardService"
4. intMerchant3:"VoucherService"
5. intMerchant4:"DigitalProductService"
6. extMerchant1:"Partner1"
7. extMerchant2:"Partner2"
8. extMerchant3:"Partner3"
9. extMerchant4:"Partner4"
10. customer1:"Alice"
11. customer2:"Bob"
12. customer3:"Charlie"


# Example of JWT
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL2RhbWwuY29tL2xlZGdlci1hcGkiOnsibGVkZ2VySWQiOiJkYS1tYXJrZXRwbGFjZS1zYW5kYm94IiwiYXBwbGljYXRpb25JZCI6InNlMmxpZmUiLCJhZG1pbiI6dHJ1ZSwiYWN0QXMiOlsiUGxhdGZvcm1PcGVyYXRvciJdLCJyZWFkQXMiOlsiUGxhdGZvcm1PcGVyYXRvciIsIlB1YmxpYyJdfSwiaWF0IjoxNjQ0MjIyMzQyfQ.MMYvhRGmN_XIitoFYv2ouYb5JqVtG75ruAG2vSgKMfc
Please update the ledgerId correspondingly

# Init script
SmartCash.Tests.Onboarding2:test
