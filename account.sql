INSERT INTO public.account(
	account_id, password, type)
	VALUES ('ldhai', '123', 0),
			('vthoang', '1234', 1),
			('vdhuy', '1234', 1),
			('thduong','12345',2),
			('lgbao','12345',2);
INSERT INTO public.student(
	student_id, student_name, class_id, account_id)
	VALUES ('001', 'Tran Hai Duong', '19ctt1', 'thduong'),
			('002', 'Le Gia Bao', '19ctt1', 'lgbao');
INSERT INTO public.lecturer(
	lecturer_id, lecturer_name, account_id)
	VALUES ('100', 'Vu Thien Hoang', 'vthoang'),
			('200', 'Vu Duc Huy', 'vdhuy');