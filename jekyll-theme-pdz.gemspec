# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "jekyll-theme-pdz"
  spec.version       = "0.1.4"
  spec.authors       = ["PowerShell du Zèro", "Thomas ILLIET"]
  spec.email         = ["contact@powershell-du-zero.fr"]

  spec.summary       = "A modern flat theme for Jenkins"
  spec.homepage      = "https://github.com/Powershell-du-Zero/jekyll-theme-pdz"
  spec.license       = "Apache-2.0"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r{^(assets|_layouts|_includes|_sass|LICENSE|README)}i) }

  spec.add_runtime_dependency "jekyll", "~> 3.8"
  spec.add_runtime_dependency "jekyll-paginate", "~> 1.1"
  spec.add_runtime_dependency "jekyll-sitemap", "~> 1.2"
  spec.add_runtime_dependency "jekyll-feed", "~> 0.11"

  spec.add_development_dependency "rake", "~> 12.0"
  spec.add_development_dependency 'html-proofer', '~> 3.0'
  spec.add_development_dependency 'rubocop', '~> 0.50'
  spec.add_development_dependency 'w3c_validators', '~> 1.3'
end
