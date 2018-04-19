# MIT License

# Copyright (c) 2017 bahamapascal

# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:

# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.

# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.


import codecs
from six import moves

# Imports the PyOTA library
from iota import Iota


numberOfAddresses = int(moves.input("How many addresses should be generated and checked for balance on each seed? "))
iotaNode = moves.input("http://eugene.iota.community:14265")


with codecs.open("inputSeeds.txt", "r", 'ascii') as seedFile:
	seeds = seedFile.read().splitlines()

# Will take a list of seeds and calls the addressGenerator function for each seed
def seedSelector ():
	x = len(seeds) - 1
	i = 0
	while i <= x:
		seed = seeds[i].strip()
		if seed:
			print("Checking seed " + seed + " for balance...")
			addressGenerator(seed.encode('ascii'))
		i += 1
	else:
		print ("Finished!!!")


# Generates addresses of a given seed using the "get_new_addresses()" function
def addressGenerator(seed):
	api = Iota(iotaNode, seed) # The iota nodes IP address must always be supplied, even if it actually isn't used in this case.
	gna_result = api.get_new_addresses(count=numberOfAddresses) # This is the actual function to generate the address.
	addresses = gna_result['addresses']
	total = 0
	i = 0
	while i < numberOfAddresses:
		address = [addresses[i]]
		balance = addressBalance(address)
		print ("Address " + str(address[0]) + " has a balance of: " + str(balance))
		total += balance
		i += 1
	if total > 0:
		print ("The above addresses have a total balance of " + str(total) + " Iota tokens!!!")
	else:
		print ("No balance on those addresses!")

# Sends a request to the IOTA node and gets the current confirmed balance
def addressBalance(address):
	api = Iota(iotaNode)
	gb_result = api.get_balances(address)
	balance = gb_result['balances']
	return (balance[0])


print ( "Checking balance on the first " + str(numberOfAddresses) + " addresses for " + str(len(seeds)) + " seeds!")
print ("This can take a while...")
seedSelector()