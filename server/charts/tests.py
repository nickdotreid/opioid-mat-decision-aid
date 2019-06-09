from django.urls import reverse
from rest_framework.test import APITestCase

from .models import Chart
from .models import ChartEffect
from .models import ChartMedication
from .models import Effect
from .models import Medication

class ListChartsView(APITestCase):

    def test_list(self):
        chart = Chart.objects.create(
            title = 'Example Chart',
            slug = 'example-chart'
        )
        ChartEffect.objects.create(
            chart = chart,
            effect = Effect.objects.create(name='Example Effect', slug='example-effect'),
            order = 1
        )
        ChartEffect.objects.create(
            chart = chart,
            effect = Effect.objects.create(name='Test Effect', slug='test-effect'),
            order = 2
        )
        ChartMedication.objects.create(
            chart = chart,
            medication = Medication.objects.create(name='Sample Medication', slug='sample-medication'),
            order = 1
        )
        ChartMedication.objects.create(
            chart = chart,
            medication = Medication.objects.create(name='Foo', slug='foo'),
            order = 2
        )
        Chart.objects.create(
            title = 'Test Chart',
            slug = 'test-chart'
        )

        response = self.client.get(reverse('charts-all'))

        self.assertEqual(response.status_code, 200)
        titles = [element['title'] for element in response.data]
        slugs = [element['slug'] for element in response.data]
        self.assertEqual(titles, ['Example Chart', 'Test Chart'])
        self.assertEqual(slugs, ['example-chart', 'test-chart'])
        chart = response.data[0]
        self.assertEqual(chart['effects'], ['exampleEffect', 'testEffect'])
        self.assertEqual(chart['medications'], ['sampleMedication', 'foo'])
