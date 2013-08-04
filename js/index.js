function civs($scope) {
   $scope.civilizations = [
      {'value': 'Aztecs', 'name': 'Aztecs'},
      {'value': 'Britons', 'name': 'Britons'},
      {'value': 'Byzantines', 'name': 'Byzantines'},
      {'value': 'Celts', 'name': 'Celts'},
      {'value': 'Chinese', 'name': 'Chinese'},
      {'value': 'Franks', 'name': 'Franks'},
      {'value': 'Goths', 'name': 'Goths'},
      {'value': 'Huns', 'name': 'Huns'},
      {'value': 'Japanese', 'name': 'Japanese'},
      {'value': 'Koreans', 'name': 'Koreans'},
      {'value': 'Mayans', 'name': 'Mayans'},
      {'value': 'Mongols', 'name': 'Mongols'},
      {'value': 'Persians', 'name': 'Persians'},
      {'value': 'Saracens', 'name': 'Saracens'},
      {'value': 'Spanish', 'name': 'Spanish'},
      {'value': 'Teutons', 'name': 'Teutons'},
      {'value': 'Turks', 'name': 'Turks'},
      {'value': 'Vikings', 'name': 'Vikings'}
   ];
   
   $scope.civilization = $scope.civilizations[0].value;
}