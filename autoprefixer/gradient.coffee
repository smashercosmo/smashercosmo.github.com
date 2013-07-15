angle = (value) ->
  value.is_a?(Sass::Script::Number) &&
  value.numerator_units.size == 1 &&
  value.numerator_units.first == "deg" &&
  value.denominator_units.empty?


linear_svg = (color_stops, x1, y1, x2, y2) ->
  transform = ''
  if angle(position_or_angle)
    transform =  "gradientTransform = 'rotate(#{position_or_angle.value})"
  gradient = "<linearGradient id='grad' gradientUnits='userSpaceOnUse' x1='#{x1}' y1='#{y1}' x2='#{x2}' y2='#{y2}' #{transform}>#{color_stops_svg(color_stops)}</linearGradient>"
  svg(gradient)
