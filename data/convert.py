""" Convert csv data (from kaggle) to line protocol for InfluxDB
"""
import sys
import datetime

def usage():
	print('Usage: python convert.py <input.csv> <output.txt>')
	sys.exit(1)

def csv_to_line_protocol(line):
	""" Convert a line of csv data to line protocol
	Exemple:
		2015-01-04T12:00:00Z,26018,6863
		to
		italy ItLoad=26018, ItSolarGen=6863 1420387200
	"""
	# Split the line by comma
	parts = line.strip().split(',')
	# Extract the date, ItLoad and ItSolarGen
	date, ItLoad, ItSolarGen = parts
	# Convert the date to a timestamp
	timestamp = int(datetime.datetime.strptime(date, '%Y-%m-%dT%H:%M:%SZ').timestamp() * 1e9)
	# Return the line protocol
	line = "italy "
	if ItLoad:
		line += f"ItLoad={ItLoad},"
	if ItSolarGen:
		line += f"ItSolarGen={ItSolarGen}"
	return line + f" {timestamp}\n"


for arg in sys.argv:
	if arg == '-h' or arg == '--help':
		usage()
if len(sys.argv) != 3:
	usage()

input_file = sys.argv[1]
output_file = sys.argv[2]

# For each line in the input file, we write a line protocol to the output file
with open(input_file, 'r') as f:
	with open(output_file, 'w') as out:
		for line in f:
			# Skip the header
			if line.startswith('utc'):
				continue
			out.write(csv_to_line_protocol(line))