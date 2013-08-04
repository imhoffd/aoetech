function civs($scope) {
   $scope.civilizations = [
      {'name': 'Aztecs'},
      {'name': 'Britons'},
      {'name': 'Byzantines'},
      {'name': 'Celts'},
      {'name': 'Chinese'},
      {'name': 'Franks'},
      {'name': 'Goths'},
      {'name': 'Huns'},
      {'name': 'Japanese'},
      {'name': 'Koreans'},
      {'name': 'Mayans'},
      {'name': 'Mongols'},
      {'name': 'Persians'},
      {'name': 'Saracens'},
      {'name': 'Spanish'},
      {'name': 'Teutons'},
      {'name': 'Turks'},
      {'name': 'Vikings'}
   ];
   
   $scope.civilization = $scope.civilizations[0];
}