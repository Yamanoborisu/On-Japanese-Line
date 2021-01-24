var firebaseConfig = {
	apiKey: "AIzaSyAjE5nh3ve8O7tBPSJaH8hAP7QmUT6LSSk",
	authDomain: "on-japaneseline.firebaseapp.com",
	projectId: "on-japaneseline",
	storageBucket: "on-japaneseline.appspot.com",
	messagingSenderId: "405585116489",
	appId: "1:405585116489:web:20b50ef5bfcf9bba48ee98",
	measurementId: "G-V5T91NMZJG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Reference messages collection
var messagesRef = firebase.database().ref('messages');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e) {
	e.preventDefault();

	// Get values
	var name = getInputVal('name');
	var other = getInputVal('other');
	var email = getInputVal('email');
	var phone = getInputVal('phone');
	var message = getInputVal('message');

	// Save message
	saveMessage(name, other, email, phone, message);

	// Show alert
	document.querySelector('.alert').style.display = 'block';

	// Hide alert after 3 seconds
	setTimeout(function () {
		document.querySelector('.alert').style.display = 'none';
	}, 3000);

	// Clear form
	document.getElementById('contactForm').reset();
}

// Function to get get form values
function getInputVal(id) {
	return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, company, email, phone, message) {
	var newMessageRef = messagesRef.push();
	newMessageRef.set({
		name: name,
		company: company,
		email: email,
		phone: phone,
		message: message
	});
}