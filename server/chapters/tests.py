from django.urls import reverse
from rest_framework.test import APITestCase

from .models import Chapter
from .models import Page

class ContentViewTest(APITestCase):

    def test_list_content(self):
        chapter = Chapter.objects.create(
            title = 'First Chapter'
        )
        Page.objects.create(
            chapter = chapter,
            title = 'First page',
            content = '<p>Example paragraph</p>'
        )
        Page.objects.create(
            chapter = chapter,
            title = 'Second page',
            content = '<p>Another paragraph with <a href="#">a link</a></p>'
        )
        Chapter.objects.create(
            title = 'Second Chapter'
        )

        response = self.client.get(reverse('chapters-content'))
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)
        first_chapter = response.data[0]
        self.assertEqual(len(first_chapter['pages']), 2)
        self.assertEqual(first_chapter['pages'][0]['title'], 'First page')
        self.assertEqual(first_chapter['pages'][0]['content'], '<p>Example paragraph</p>')

    def test_unpublished_chapters_not_listed(self):
        Chapter.objects.create(
            title = 'Example'
        )
        Chapter.objects.create(
            title = 'Unpublished example',
            published = False
        )
        Chapter.objects.create(
            title = 'Test'
        )

        response = self.client.get(reverse('chapters-content'))

        self.assertEqual(response.status_code, 200)
        chapter_titles = [chapter['title'] for chapter in response.data]
        self.assertEqual(chapter_titles, ['Example', 'Test'])

class PageViewTests(APITestCase):

    def test_view_page_list(self):
        Page.objects.create(
            title = 'First page',
            content = '<p>Example paragraph</p>'
        )
        Page.objects.create(
            title = 'Second page',
            content = '<p>Another paragraph with <a href="#">a link</a></p>'
        )

        response = self.client.get(reverse('page-list'))

        self.assertEqual(response.status_code, 200)
        page_titles = [page['title'] for page in response.data]
        self.assertEqual(page_titles, ['First page', 'Second page'])

