# encoding: utf-8

rijeci = []

File.readlines('rijeci.txt').each do |line|
	word_regex = /^(?<rijec>\p{Word}{4,10}),(?<definicija>.*)$/
	matches = word_regex.match(line)

	unless matches.nil?
		rijeci << { :rijec => matches[:rijec] , :definicija => matches[:definicija] } 
	end
end

rijeci.sort! { |x,y| x[:rijec].length <=> y[:rijec].length }

rijeci.each do |rijec|
   puts rijec[:rijec] + " - " + rijec[:definicija]
end