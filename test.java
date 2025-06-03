An Armstrong number is a positive integer that equals the sum of its digits, each raised to the power of n, where n= the number of digits in the number.

abcd... == a^n + b^n + c^n + d^n + ...

Example:
isArmstrong(153) == true
n = 3
1^3 + 5^3 + 3^3 == 153
1 + 125 + 27 = 153

isArmstrong(120) == false
isArmstrong(1253) == false
isArmstrong(1634) == true

Calculate the set of all Armstrong numbers between 0 and 2000. 

Public Integer[] arr ArmSet() {
	Integer[] arr = ArrayList();
	
	for(int i=0; i<=2000; i++) {
		If  isArmstrong(i) {
			arr.add(i);
		}
	}
	Return arr;
}

// 153
Public boolean isArmstrong(int x) {
	String[] s = String.parseInt(x).split();
	Int len = s.length;    // 3
	Int result = 0;

	for(int i = 0; i <len; i++) {
		Result += Math.pow(s[i], len);
} 
	If (x == result) {
		Return true;
}
	Return false;

} 
