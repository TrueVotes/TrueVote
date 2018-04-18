from iota import Iota

# Generate a random seed.
#api = Iota('http://localhost:14265')

# Specify seed.
#api = Iota('http://iota1.heidger.eu:14265', 'HDFTSVWTCNXFIQ9TNKTFAH9YJN9MQDEHTSWODIJQQNKRLJNNACZQIENFOHLNSTPNBJGKTHMCQBIHCJFMW')
api = Iota('http://localhost:14265', 'HDFTSVWTCNXFIQ9TNKTFAH9YJN9MQDEHTSWODIJQQNKRLJNNACZQIENFOHLNSTPNBJGKTHMCQBIHCJFMW')


print(api.get_node_info())