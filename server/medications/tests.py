from django.urls import reverse
from rest_framework.test import APITestCase

from .models import Effect
from .models import Medication
from .models import MedicationEffect

class AllMedicationsViewTest(APITestCase):

    def test_list_medications(self):
        medication = Medication.objects.create(
            name = 'Medication',
            slug = 'medication'
        )
        test_effect = Effect.objects.create(
            name = 'Test Effect',
            slug = 'test-effect'
        )
        other_effect = Effect.objects.create(
            name = 'Other Effect',
            slug = 'other-effect'
        )
        MedicationEffect.objects.create(
            medication = medication,
            effect = test_effect,
            short_description = 'value',
            description = 'This is the longer description.'
        )

        response = self.client.get(reverse('medications-all'))

        self.assertEqual(response.status_code, 200)
        effect_names = [effect['name'] for effect in response.data['effects']]
        effect_keys = [effect['key'] for effect in response.data['effects']]
        self.assertEqual(effect_names, ['Test Effect', 'Other Effect'])
        self.assertEqual(effect_keys, ['testEffect', 'otherEffect'])
        medication_names = [medication['name'] for medication in response.data['medications']]
        medication_keys = [medication['key'] for medication in response.data['medications']]
        self.assertEqual(medication_names, ['Medication'])
        self.assertEqual(medication_keys, ['medication'])
        medication = response.data['medications'][0]
        self.assertEqual(medication['testEffect']['short_description'], 'value')
        self.assertEqual(medication['testEffect']['description'], 'This is the longer description.')
        self.assertFalse('otherEffect' in medication)
